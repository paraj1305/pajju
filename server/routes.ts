import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Contact Form Route
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.VITE_SMTP_USER,
          pass: process.env.VITE_SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.VITE_SMTP_USER}>`,
        to: "parajbhatasanaparaj@gmail.com",
        subject: `New Inquiry from Portfolio: ${name}`,
        text: `From: ${name} (${email})\n\nMessage:\n${message}`,
        replyTo: email
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Email Error:", error);
      res.status(500).json({ message: "Failed to send email", error: error.message });
    }
  });

  // Chatbot Route
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return res.json({ 
        message: "I'm currently in offline mode (Gemini API key not set in .env). I can still tell you that Paraj is an expert Backend Developer specializing in Python, AI, and Laravel. Please add your API key to enable full AI responses!" 
      });
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are build.withPAJJU AI Assistant. You should only answer based on the following website content about Paraj Bhatasana:
        - Role: Backend Developer & AI Solutions Engineer
        - Location: Ahmedabad, Gujarat
        - Expertise: Python (Django, FastAPI), Laravel, REST APIs, AI-powered automation, WhatsApp Business API.
        - Experience: 5+ years, 50+ successful projects.
        - Skills: PostgreSQL, MongoDB, React, Tailwind CSS, n8n, Rettel AI.
        - Contact: bhatasanaparaj@gmail.com
        - Mission: Building scalable systems and self-evolving intelligent systems.
        - Logo: build.withPAJJU
        Be professional, friendly, and concise. Only talk about Paraj's work and skills. If asked something else, politely stay on topic about Paraj.`
      });

      const chat = model.startChat({
        history: history || [],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      res.json({ message: response.text() });
    } catch (error: any) {
      console.error("Chat Error:", error);
      res.status(500).json({ message: "The AI is feeling a bit tired. Please try again in a moment." });
    }
  });

  return httpServer;
}
