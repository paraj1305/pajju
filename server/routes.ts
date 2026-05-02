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
        to: "bhatasanaparaj@gmail.com",
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

    const fallbackResponse = (userMsg: string) => {
      const lowerMsg = userMsg.toLowerCase();
      let responseText = "";
      
      if (lowerMsg.includes("experience") || lowerMsg.includes("years")) {
        responseText += "Paraj has over 5 years of experience and has successfully completed over 50 projects.";
      } else if (lowerMsg.includes("skill") || lowerMsg.includes("stack") || lowerMsg.includes("tech")) {
        responseText += "Paraj specializes in Python (FastAPI, Django), Laravel, and modern AI automation tools like n8n and LangChain.";
      } else if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("hire")) {
        responseText += "You can contact Paraj at bhatasanaparaj@gmail.com.";
      } else if (lowerMsg.includes("location") || lowerMsg.includes("where")) {
        responseText += "Paraj is based in Ahmedabad, Gujarat.";
      } else {
        responseText += "I can tell you about Paraj's skills, experience, location, or contact info. What would you like to know?";
      }
      return responseText;
    };

    try {
      const systemInstruction = `You are build.withPAJJU AI Assistant. You should only answer based on the following website content about Paraj Bhatasana:
        - Role: Backend Developer & AI Solutions Engineer
        - Location: Ahmedabad, Gujarat
        - Expertise: Python (Django, FastAPI), Laravel, REST APIs, AI-powered automation, WhatsApp Business API.
        - Experience: 5+ years, 50+ successful projects.
        - Skills: PostgreSQL, MongoDB, React, Tailwind CSS, n8n, Rettel AI.
        - Contact: bhatasanaparaj@gmail.com
        - Mission: Building scalable systems and self-evolving intelligent systems.
        - Logo: build.withPAJJU
        Be professional, friendly, and concise. Only talk about Paraj's work and skills. If asked something else, politely stay on topic about Paraj.`;

      const openAiMessages = [
        { role: "system", content: systemInstruction },
        ...(history || []).map((h: any) => ({
          role: h.role === "model" ? "assistant" : "user",
          content: h.parts && h.parts[0] ? h.parts[0].text : ""
        })),
        { role: "user", content: message }
      ];

      const pollResponse = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: openAiMessages,
          model: "openai",
          temperature: 0.7
        })
      });

      if (!pollResponse.ok) {
        throw new Error("Free LLM API failed");
      }

      const data = await pollResponse.json();
      const botMessage = data.choices[0].message.content;

      res.json({ message: botMessage });
    } catch (error: any) {
      console.error("Chat Error:", error);
      // Fallback if the free LLM API fails
      return res.json({ message: "I am using my backup brain due to an API issue. " + fallbackResponse(message) });
    }
  });

  return httpServer;
}
