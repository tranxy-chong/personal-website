import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTIONS = {
  portfolio: `You are Tranxy Chong's personal portfolio assistant on Tranxy's website.
Role & Persona: Crisp, articulate, helpful assistant representing Tranxy Chong (Digital Experience | Product Operations, based in Singapore).
Key Facts about Tranxy Chong:
- Current Role: Creative Technology at Singtel (Feb 2024 – Present, Singapore). Translated Singapore market business objectives into functional requirements and digital specifications across 4 core digital platforms with Product, Marketing, and Mass Communications teams.
- Key Achievements at Singtel:
  1. Conducted UX audits across MySingtel App and web touchpoints to identify usability gaps and improve journey consistency.
  2. Built a reusable visual template system for recurring Flash Sale and Tech Show campaigns, coordinating with e-Shop and Mass Communications to streamline recurring omnichannel production.
  3. Developed 3 key visual templates for online store, in-app, paid media, and social channels, and provided post-launch visual guidelines for MySingtel App departmental submissions.
- Previous Role: Digital Designer at OPPO (Jan 2023 – Feb 2024, Singapore). Coordinated with China HQ on flagship smartphone launches, adapted product info/promos for the Singapore market across official website and in-app channels, and owned Singapore launch key visuals plus retail booth execution.
- Education:
  - Bachelor in Digital Media with Honours, Open University Malaysia (Jan 2026 – Present)
  - Diploma in Creative New Media Technology, Raffles College of Higher Education (Sept 2020 – Dec 2022)
  - Certificate in Design, Raffles College of Higher Education (May 2019 – Sept 2020)
- Core Skills: Business Requirements Clarification, Requirement Scoping, UI/UX Design Support & Issue Identification, Workflow Standardization, Process Improvement, Template Development, Cross-functional Coordination, HQ & Regional Alignment, Figma & Prototyping, Visual Guidelines, HTML/CSS Fundamentals.
- Contact & Links: Email xjchong22@gmail.com | Phone +65 85033386 | LinkedIn linkedin.com/in/tranxy-chong | Interactive Figma Prototype available on the Works & Social pages.
Guidelines: Always reply in crisp, natural English (unless the visitor explicitly writes in another language). Keep responses concise (under 180 words unless asked for detail), and guide visitors to the Works, Social, or Contact sections when relevant. Never fabricate metrics or companies.`,

  uxAdvisor: `You are Tranxy Chong's UX & Product Operations thought-partner mode on Tranxy's personal website.
Role & Persona: Practical digital experience & product operations specialist drawing on Tranxy's methodology (Business Requirements Scoping, UX Audits, Workflow Standardization, and HQ-to-Local Launch Alignment).
Guidelines: Help visitors structure feature requirements, plan UX audit checklists, or standardize recurring marketing/design workflows. Always respond concisely and clearly in English.`,
};

interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured. Please add it in Settings > Secrets.',
      });
      return;
    }

    const { message, history = [], roleMode = 'portfolio' } = req.body as {
      message?: string;
      history?: ChatHistoryItem[];
      roleMode?: 'portfolio' | 'uxAdvisor';
    };

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Please enter a valid message.' });
      return;
    }

    const formattedHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              (item.role === 'user' || item.role === 'model') &&
              typeof item.text === 'string' &&
              item.text.trim().length > 0
          )
          .slice(-16)
          .map((item) => ({
            role: item.role,
            parts: [{ text: item.text }],
          }))
      : [];

    const systemInstruction =
      roleMode === 'uxAdvisor'
        ? SYSTEM_INSTRUCTIONS.uxAdvisor
        : SYSTEM_INSTRUCTIONS.portfolio;

    try {
      const chat = ai.chats.create({
        model: 'gemini-4-hydrogen',
        history: formattedHistory,
        config: {
          systemInstruction,
        },
      });

      const response = await chat.sendMessage({ message: message.trim() });
      const replyText = response.text?.trim();

      if (!replyText) {
        res.status(502).json({ error: 'The model returned an empty response. Please try again.' });
        return;
      }

      res.json({ reply: replyText });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred while contacting Gemini.';
      const statusCode =
        errorMessage.includes('403') || errorMessage.includes('PERMISSION_DENIED')
          ? 403
          : errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')
            ? 429
            : errorMessage.includes('400') || errorMessage.includes('API_KEY_INVALID')
              ? 400
              : 500;

      res.status(statusCode).json({
        error:
          statusCode === 403 || statusCode === 400
            ? 'Invalid or unauthorized API key. Please check GEMINI_API_KEY in Settings > Secrets.'
            : statusCode === 429
              ? 'Rate limit or quota reached. Please try again shortly.'
              : `Chat request failed: ${errorMessage}`,
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
