/**
 * Google Gemini AI Service
 * 
 * Integrates with Google's Gemini AI API to provide intelligent chatbot functionality
 * for product-related queries. Handles conversation context, query validation,
 * and generates contextual responses based on user's product inventory.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  /**
   * Initialize Gemini AI Service
   * 
   * Sets up Google Gemini AI client, validates API configuration,
   * and initializes conversation memory storage.
   * 
   * @constructor
   * @throws {Error} If GEMINI_API_KEY environment variable is not configured
   */
  constructor() {
    console.log("GeminiService initialized");
    console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Present" : "Missing");
    
    // Validate API key configuration
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    
    // Initialize Google Generative AI client
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // In-memory conversation storage for context-aware responses
    this.conversations = new Map(); // userId -> array of {user: string, bot: string}
    this.maxHistoryLength = 5; // Limit conversation history to last 5 exchanges per user
  }

  /**
   * Process Product-Related Queries with AI
   * 
   * Main method for handling natural language queries about user's products.
   * Validates input, checks query relevance, generates contextual responses,
   * and maintains conversation history for better user experience.
   * 
   * @async
   * @method processProductQuery
   * @param {string} prompt - User's natural language query
   * @param {Array} products - User's product inventory data
   * @param {string} userId - User ID for conversation context
   * @returns {Promise<string>} AI-generated response to the query
   * @throws {Error} Validation errors or AI service failures
   */
  async processProductQuery(prompt, products, userId) {
    try {
      // Input validation
      if (!prompt || typeof prompt !== "string") {
        throw new Error("Valid prompt is required");
      }

      if (!Array.isArray(products)) {
        throw new Error("Products must be an array");
      }

      if (!userId) {
        throw new Error("User ID is required");
      }

      // Retrieve conversation history for context-aware processing
      const conversationHistory = this.getConversationHistory(userId);
      
      // Validate that query is product-related before processing
      const isProductRelated = await this.isProductRelatedQuery(prompt, conversationHistory);

      if (!isProductRelated) {
        return "I'm sorry, but I can only help you with questions about your products and inventory. Please ask me something related to your products!";
      }

      // Build context from user's product inventory
      const productContext = this.constructProductContext(products);

      // Create comprehensive prompt with context and conversation history
      const fullPrompt = this.buildContextualPrompt(
        prompt,
        productContext,
        conversationHistory
      );

      // Generate AI response using Gemini API
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      const botResponse = text.trim();

      // Store conversation exchange for future context
      this.addToConversationHistory(userId, prompt, botResponse);

      return botResponse;
      
    } catch (error) {
      console.error("Error processing product query:", error);

      // Handle specific API configuration errors
      if (error.message?.includes("API_KEY")) {
        throw new Error("Gemini API configuration error");
      }

      // Handle API quota and rate limiting errors
      if (
        error.message?.includes("quota") ||
        error.message?.includes("rate limit")
      ) {
        throw new Error("Gemini API quota exceeded");
      }

      // Generic error for unexpected failures
      throw new Error("Failed to process query with Gemini AI");
    }
  }

  /**
   * Validate Product-Related Query
   * 
   * Uses AI to determine if a user query is related to products or inventory.
   * Considers conversation context to handle follow-up questions appropriately.
   * 
   * @async
   * @method isProductRelatedQuery
   * @param {string} prompt - User's query to validate
   * @param {Array} [conversationHistory=[]] - Recent conversation context
   * @returns {Promise<boolean>} True if query is product-related, false otherwise
   */
  async isProductRelatedQuery(prompt, conversationHistory = []) {
    try {
      // If recent conversation was about products, likely a follow-up question
      if (conversationHistory.length > 0) {
        const recentExchange = conversationHistory[conversationHistory.length - 1];
        // Check if last bot response was product-related (not an error message)
        if (recentExchange && recentExchange.bot && 
            !recentExchange.bot.includes("I'm sorry, but I can only help")) {
          return true;
        }
      }

      // Build conversation context for AI analysis
      const conversationContext = conversationHistory.length > 0 
        ? `\nRecent conversation context:\n${conversationHistory.slice(-2).map(ex => 
            `User: ${ex.user}\nBot: ${ex.bot}`).join('\n')}\n` 
        : '';

      // Create prompt for AI to analyze query relevance
      const checkPrompt = `
                Analyze this user query and determine if it's related to products, inventory, items, or business goods.
                Consider the conversation context for follow-up questions.
                
                ${conversationContext}
                Current Query: "${prompt}"
                
                Respond with only "YES" if the query is about products/inventory/items/goods (including follow-up questions about previously discussed products), or "NO" if it's about something else entirely.
                Do not provide any explanation, just YES or NO.
            `;

      // Get AI analysis of query relevance
      const result = await this.model.generateContent(checkPrompt);
      const response = await result.response;
      const text = response.text().trim().toUpperCase();

      return text === "YES";
      
    } catch (error) {
      console.error("Error checking if query is product-related:", error);
      // Default to true to avoid false negatives that would frustrate users
      return true;
    }
  }

  // Construct context from user's product data
  constructProductContext(products) {
    if (!products || products.length === 0) {
      return "No products found in inventory.";
    }

    const productSummary = products
      .map((product) => {
        return `- ${product.name}: ${
          product.description || "No description"
        } (Category: ${product.category || "Uncategorized"}, Quantity: ${
          product.quantity || 0
        }, Price: $${product.unitPrice || 0}, Active: ${
          product.isActive !== false ? "Yes" : "No"
        })`;
      })
      .join("\n");

    return `User's Product Inventory:\n${productSummary}`;
  }

  /**
   * Retrieve Conversation History
   * 
   * Gets stored conversation history for a specific user to maintain context
   * across multiple interactions.
   * 
   * @method getConversationHistory
   * @param {string} userId - User ID to retrieve conversation history for
   * @returns {Array} Array of conversation exchanges {user: string, bot: string}
   */
  getConversationHistory(userId) {
    return this.conversations.get(userId) || [];
  }

  /**
   * Store Conversation Exchange
   * 
   * Adds a new user-bot exchange to conversation history with automatic
   * cleanup to prevent memory bloat.
   * 
   * @method addToConversationHistory
   * @param {string} userId - User ID for conversation storage
   * @param {string} userMessage - User's message/query
   * @param {string} botResponse - AI-generated response
   */
  addToConversationHistory(userId, userMessage, botResponse) {
    let history = this.conversations.get(userId) || [];

    // Add new conversation exchange
    history.push({ user: userMessage, bot: botResponse });

    // Maintain memory efficiency by limiting history length
    if (history.length > this.maxHistoryLength) {
      history = history.slice(-this.maxHistoryLength);
    }

    // Update stored conversation history
    this.conversations.set(userId, history);
  }

  /**
   * Format Conversation Context
   * 
   * Converts conversation history array into formatted string for AI context.
   * Provides recent conversation context to improve response relevance.
   * 
   * @method buildConversationContext
   * @param {Array} history - Array of conversation exchanges
   * @returns {string} Formatted conversation context string
   */
  buildConversationContext(history) {
    // Return empty string if no conversation history
    if (history.length === 0) return "";

    // Format each exchange for AI context
    const contextLines = history
      .map((exchange) => `User: ${exchange.user}\nBot: ${exchange.bot}`)
      .join("\n");

    return `\nRecent Conversation:\n${contextLines}\n`;
  }

  /**
   * Build Complete AI Prompt
   * 
   * Constructs the full prompt for Gemini AI including user query,
   * product context, conversation history, and response instructions.
   * 
   * @method buildContextualPrompt
   * @param {string} userPrompt - User's current question/query
   * @param {string} productContext - Formatted product inventory context
   * @param {Array} conversationHistory - Recent conversation exchanges
   * @returns {string} Complete prompt for AI processing
   */
  buildContextualPrompt(userPrompt, productContext, conversationHistory) {
    // Build conversation context from history
    const conversationContext = this.buildConversationContext(conversationHistory);

    // Construct comprehensive prompt with context and instructions
    return `
            You are a friendly and helpful chatbot assistant for a product inventory system. Answer the user's question about their products in a conversational, single-line response.
            
            User's Product Inventory:
            ${productContext}
            ${conversationContext}
            Current User Question: ${userPrompt}
            
            Instructions:
            - Answer in exactly ONE line like a chatbot would
            - Be friendly, conversational, and helpful
            - Use the conversation history to understand context and follow-up questions
            - Keep it concise but natural (like "You have 10 electronics items worth $5,000 total!")
            - If they ask about products they don't have, politely mention they don't have those items
            - Use a warm, helpful tone like you're talking to a friend
            - Don't use bullet points or multiple sentences - just one friendly line
            
            Response:
        `;
  }
}

export default GeminiService;
