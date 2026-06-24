import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client lazily
  let ai: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not set. Please set it in Settings > Secrets.");
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  }

  // API endpoint for WordPress AI Assistant
  app.post("/api/wp-assistant", async (req, res) => {
    try {
      const { message, history } = req.body;
      const client = getGeminiClient();

      // Configure system instruction to guide Gemini as WiliWeb WordPress Specialist
      const systemInstruction = `You are "WiliWeb Technical Support" (پشتیبان فنی تخصصی ویلی وب), a proprietary advanced code and development specialist system built by the professional "WiliWeb" (ویلی وب) team.
You help WordPress designers and developers with:
1. Writing clean, highly optimized, industry-standard PHP snippets for themes, child themes (functions.php), or custom plugins.
2. Custom CSS/SCSS tweaks for Elementor, Divi, Gutenberg, or any other WordPress page builders.
3. Solving common WordPress errors (e.g., White Screen of Death, Database Connection Error, plugin conflicts, SMTP issues, custom .htaccess rules).
4. Designing custom WP_Queries, custom post types (CPTs), and taxonomies.
5. Providing web performance advice, speed optimization hacks, and SEO-friendly coding patterns.

CRITICAL BRANDING RULES:
- You are part of the WiliWeb (ویلی وب) brand. Never mention Google, Gemini, OpenAI, or being an LLM or generic AI. If asked, you are WiliWeb's proprietary backend expert toolkit.
- Since the user speaks Persian (Farsi), you MUST respond in extremely fluent, friendly, and professional Persian (Farsi).
- Write all code blocks (PHP, CSS, JS, HTML) in clean English, with comments inside explaining exactly how it works and where to paste it (e.g. functions.php, customizer, etc.).
- Keep your answers highly practical, concise, and professional. Avoid extra fluff. Recommend standard, verified WordPress hooks and functions.`;

      const formattedContents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.role,
            parts: [{ text: turn.text }]
          });
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const text = response.text;
      res.json({ text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred with the AI assistant." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
