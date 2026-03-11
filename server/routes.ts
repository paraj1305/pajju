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
        host: process.env.VITE_SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.VITE_SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
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
    } catch (error) {
      console.error("Email Error:", error);
      res.status(500).json({ message: "Failed to send email" });
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
      // Fallback to static logic if no API key
      return res.json({ 
        message: "I'm currently in offline mode (API key not set). Paraj is a Backend Developer specializing in Python and AI. How can I help?" 
      });
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are Paraj's AI Assistant. You should only answer based on the following website content about Paraj:
        - Name: Paraj Bhatasana
        - Role: Backend Developer & AI Solutions Engineer
        - Location: Ahmedabad, Gujarat
        - Expertise: Python (Django, FastAPI), Laravel, REST APIs, AI-powered automation, WhatsApp Business API.
        - Experience: 5+ years, 50+ successful projects.
        - Skills: PostgreSQL, MongoDB, React, Tailwind CSS, n8n, Rettel AI.
        - Contact: bhatasanaparaj@gmail.com
        - Focus: Building scalable systems and self-evolving intelligent systems.
        Be professional, friendly, and concise. If someone asks something not related to Paraj or his work, politely redirect them to his portfolio content.`
      });

      const chat = model.startChat({
        history: history || [],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      res.json({ message: response.text() });
    } catch (error) {
      console.error("Chat Error:", error);
      res.status(500).json({ message: "Something went wrong with the AI" });
    }
  });

  return httpServer;
}
