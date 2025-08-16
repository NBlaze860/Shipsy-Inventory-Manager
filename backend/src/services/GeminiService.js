import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    console.log("GeminiService initialized");
    console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Present" : "Missing");
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Simple in-memory conversation storage
    this.conversations = new Map(); // userId -> array of {user: string, bot: string}
    this.maxHistoryLength = 5; // Keep last 5 exchanges per user
  }

  // Process product-related queries using Gemini AI
  async processProductQuery(prompt, products, userId) {
    try {
      // Validate inputs
      if (!prompt || typeof prompt !== "string") {
        throw new Error("Valid prompt is required");
      }

      if (!Array.isArray(products)) {
        throw new Error("Products must be an array");
      }

      if (!userId) {
        throw new Error("User ID is required");
      }

      // Get conversation history for context-aware checking
      const conversationHistory = this.getConversationHistory(userId);
      
      // First, check if the query is product-related (with context)
      const isProductRelated = await this.isProductRelatedQuery(prompt, conversationHistory);

      if (!isProductRelated) {
        return "I'm sorry, but I can only help you with questions about your products and inventory. Please ask me something related to your products!";
      }

      // Construct context from user's product data
      const productContext = this.constructProductContext(products);

      // conversationHistory already retrieved above

      // Create the full prompt with context and history
      const fullPrompt = this.buildContextualPrompt(
        prompt,
        productContext,
        conversationHistory
      );

      // Call Gemini API
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      const botResponse = text.trim();

      // Store this exchange in conversation history
      this.addToConversationHistory(userId, prompt, botResponse);

      // Return concise response
      return botResponse;
    } catch (error) {
      console.error("Error processing product query:", error);

      // Handle specific API errors
      if (error.message?.includes("API_KEY")) {
        throw new Error("Gemini API configuration error");
      }

      if (
        error.message?.includes("quota") ||
        error.message?.includes("rate limit")
      ) {
        throw new Error("Gemini API quota exceeded");
      }

      // Generic error for other cases
      throw new Error("Failed to process query with Gemini AI");
    }
  }

  // Check if the query is related to products (with conversation context)
  async isProductRelatedQuery(prompt, conversationHistory = []) {
    try {
      // If there's recent conversation history, it's likely a follow-up question
      if (conversationHistory.length > 0) {
        const recentExchange = conversationHistory[conversationHistory.length - 1];
        // If the last bot response was about products, assume this is a follow-up
        if (recentExchange && recentExchange.bot && 
            !recentExchange.bot.includes("I'm sorry, but I can only help")) {
          return true;
        }
      }

      const conversationContext = conversationHistory.length > 0 
        ? `\nRecent conversation context:\n${conversationHistory.slice(-2).map(ex => 
            `User: ${ex.user}\nBot: ${ex.bot}`).join('\n')}\n` 
        : '';

      const checkPrompt = `
                Analyze this user query and determine if it's related to products, inventory, items, or business goods.
                Consider the conversation context for follow-up questions.
                
                ${conversationContext}
                Current Query: "${prompt}"
                
                Respond with only "YES" if the query is about products/inventory/items/goods (including follow-up questions about previously discussed products), or "NO" if it's about something else entirely.
                Do not provide any explanation, just YES or NO.
            `;

      const result = await this.model.generateContent(checkPrompt);
      const response = await result.response;
      const text = response.text().trim().toUpperCase();

      return text === "YES";
    } catch (error) {
      console.error("Error checking if query is product-related:", error);
      // If we can't determine, assume it's product-related to avoid false negatives
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

  // Get conversation history for a user
  getConversationHistory(userId) {
    return this.conversations.get(userId) || [];
  }

  // Add exchange to conversation history
  addToConversationHistory(userId, userMessage, botResponse) {
    let history = this.conversations.get(userId) || [];

    // Add new exchange
    history.push({ user: userMessage, bot: botResponse });

    // Keep only last N exchanges
    if (history.length > this.maxHistoryLength) {
      history = history.slice(-this.maxHistoryLength);
    }

    this.conversations.set(userId, history);
  }

  // Build conversation context string
  buildConversationContext(history) {
    if (history.length === 0) return "";

    const contextLines = history
      .map((exchange) => `User: ${exchange.user}\nBot: ${exchange.bot}`)
      .join("\n");

    return `\nRecent Conversation:\n${contextLines}\n`;
  }

  // Build the full contextual prompt for Gemini
  buildContextualPrompt(userPrompt, productContext, conversationHistory) {
    const conversationContext =
      this.buildConversationContext(conversationHistory);

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
