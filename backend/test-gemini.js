import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function testGemini() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Test with the new model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Say hello in one word";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Gemini API working!");
    console.log("Response:", text);

    // List available models (if supported)
    try {
      const models = await genAI.listModels();
      console.log("\n📋 Available models:");
      models.forEach((model) => {
        console.log(`- ${model.name}`);
      });
    } catch (e) {
      console.log("\n⚠️  Could not list models (this is normal)");
    }
  } catch (error) {
    console.error("❌ Error testing Gemini:", error.message);

    if (error.message.includes("API_KEY")) {
      console.log(
        "\n💡 Make sure your GEMINI_API_KEY is set correctly in .env file"
      );
    }

    if (error.message.includes("404")) {
      console.log("\n💡 Try these alternative model names:");
      console.log("- gemini-1.5-pro");
      console.log("- gemini-1.5-flash");
      console.log("- gemini-pro-vision");
    }
  }
}

testGemini();
