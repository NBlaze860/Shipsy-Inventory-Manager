import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    // Process product-related queries using Gemini AI
    async processProductQuery(prompt, products, userId) {
        try {
            // Validate inputs
            if (!prompt || typeof prompt !== 'string') {
                throw new Error('Valid prompt is required');
            }
            
            if (!Array.isArray(products)) {
                throw new Error('Products must be an array');
            }

            if (!userId) {
                throw new Error('User ID is required');
            }

            // First, check if the query is product-related
            const isProductRelated = await this.isProductRelatedQuery(prompt);
            
            if (!isProductRelated) {
                return "Not related to products.";
            }

            // Construct context from user's product data
            const productContext = this.constructProductContext(products);
            
            // Create the full prompt with context
            const fullPrompt = this.buildContextualPrompt(prompt, productContext, userId);
            
            // Call Gemini API
            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            // Return concise response
            return text.trim();

        } catch (error) {
            console.error('Error processing product query:', error);
            
            // Handle specific API errors
            if (error.message?.includes('API_KEY')) {
                throw new Error('Gemini API configuration error');
            }
            
            if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
                throw new Error('Gemini API quota exceeded');
            }
            
            // Generic error for other cases
            throw new Error('Failed to process query with Gemini AI');
        }
    }

    // Check if the query is related to products
    async isProductRelatedQuery(prompt) {
        try {
            const checkPrompt = `
                Analyze this user query and determine if it's related to products, inventory, items, or business goods.
                
                Query: "${prompt}"
                
                Respond with only "YES" if the query is about products/inventory/items/goods, or "NO" if it's about something else entirely.
                Do not provide any explanation, just YES or NO.
            `;

            const result = await this.model.generateContent(checkPrompt);
            const response = await result.response;
            const text = response.text().trim().toUpperCase();
            
            return text === 'YES';
        } catch (error) {
            console.error('Error checking if query is product-related:', error);
            // If we can't determine, assume it's product-related to avoid false negatives
            return true;
        }
    }

    // Construct context from user's product data
    constructProductContext(products) {
        if (!products || products.length === 0) {
            return "No products found in inventory.";
        }

        const productSummary = products.map(product => {
            return `- ${product.name}: ${product.description || 'No description'} (Category: ${product.category || 'Uncategorized'}, Quantity: ${product.quantity || 0}, Price: $${product.unitPrice || 0}, Active: ${product.isActive !== false ? 'Yes' : 'No'})`;
        }).join('\n');

        return `User's Product Inventory:\n${productSummary}`;
    }

    // Build the full contextual prompt for Gemini
    buildContextualPrompt(userPrompt, productContext, userId) {
        return `
            You are a helpful assistant that answers questions about a user's product inventory. 
            
            Context:
            ${productContext}
            
            User Question: ${userPrompt}
            
            Instructions:
            - Only answer questions related to the products shown in the context above
            - Be concise and direct in your response
            - Use minimal words necessary to answer the question
            - If the user asks about products not in their inventory, mention they don't have those products
            - Focus on providing useful information about their existing products
            
            Answer:
        `;
    }
}

export default GeminiService;