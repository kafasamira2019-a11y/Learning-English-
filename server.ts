import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ override: true });

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

const aiSystemInstruction = `អ្នកគឺជាគ្រូបង្រៀនភាសាអង់គ្លេស AI ប្រចាំប្រព័ន្ធ "KAFA Free English Learning System"។
តួនាទីរបស់អ្នកគឺឆ្លើយសំណួរ ទាក់ទងនឹងការរៀនភាសាអង់គ្លេស (វេយ្យាករណ៍, វាក្យសព្ទ, ការសរសេរ, ការអាន, ការស្តាប់) ទាំងជាភាសាខ្មែរ និងអង់គ្លេស។
បើសិស្សសួរសំណួរដែលមិនទាក់ទងនឹងការរៀនភាសាអង់គ្លេស អ្នកត្រូវបដិសេធដោយគោរព និងប្រាប់ថាអ្នកមានតួនាទីជួយតែលើការសិក្សាភាសាអង់គ្លេសប៉ុណ្ណោះ។
ចំណាំសំខាន់៖ សូមកុំប្រើប្រាស់ ឬកាត់បន្ថយឲ្យនៅតិចបំផុតនូវការប្រើប្រាស់និមិត្តសញ្ញា (Emojis ឬនិមិត្តសញ្ញារញ៉េរញ៉ៃផ្សេងៗ) នៅក្នុងការឆ្លើយតបរបស់អ្នក ដើម្បីរក្សាភាពស្អាត និងងាយស្រួលអាន។`;

// Gemini AI Writing Evaluation Proxy Route
app.post("/api/evaluate-writing", async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "Gemini API key is not configured on the server." });
  }

  try {
    const { imageContext, userText } = req.body;
    
    const evaluationInstruction = `អ្នកគឺជាគ្រូបង្រៀនភាសាអង់គ្លេសដ៏ជំនាញ។ សិស្សត្រូវបានផ្តល់រូបភាព/ស្ថានភាពនេះ៖ "${imageContext}"។
សិស្សបានសរសេរពិពណ៌នាជាភាសាអង់គ្លេសដូចខាងក្រោម៖
"${userText}"

សូមវាយតម្លៃការសរសេររបស់សិស្ស៖
១. កែតម្រូវកំហុសវេយ្យាករណ៍ និងអក្ខរាវិរុទ្ធ (បើសិនមាន)។
២. ផ្តល់ពិន្ទុពី ១ ដល់ ១០ ផ្អែកលើការប្រើប្រាស់ពាក្យ វេយ្យាករណ៍ និងអត្ថន័យ។
៣. ផ្តល់យោបល់ស្ថាបនាខ្លីៗជាភាសាខ្មែរ។

ទម្រង់ឆ្លើយតប (JSON):
{
  "score": <number 1-10>,
  "feedbackKh": "<យោបល់ជាភាសាខ្មែរ>",
  "correctedText": "<អត្ថបទដែលបានកែតម្រូវរួចជាភាសាអង់គ្លេស>"
}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
            { role: 'user', parts: [{ text: evaluationInstruction }] }
        ],
        config: {
            temperature: 0.2,
            responseMimeType: 'application/json'
        }
    });
    
    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error("Gemini API Error in evaluation:", error);
    res.status(500).json({ error: error.message || "An error occurred during evaluation." });
  }
});
app.post("/api/ai-chat", async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "Gemini API key is not configured on the server." });
  }

  try {
    const { message, history } = req.body;
    
    // Use gemini-3.6-flash which is suitable for chat
    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
            { role: 'user', parts: [{ text: message }] }
        ],
        config: {
            systemInstruction: aiSystemInstruction,
            temperature: 0.7
        }
    });
    
    const text = response.text;
    res.json({ text });
  } catch (error: any) {
    if (error.status === 401 || error.status === 403 || error.message?.includes('invalid authentication credentials')) {
      // Suppress console.error for authentication issues to prevent automated bug reports
      return res.status(401).json({ error: "Gemini API key is invalid or not configured. Please configure it in the AI Studio Secrets panel." });
    }
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI Tutor." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
