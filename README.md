# Portfolio Website - Local Setup Guide

This project was originally created on Replit and has been ported for local development.

## 🚀 Getting Started

Follow these steps to get your portfolio running on your local machine.

### 1. Prerequisites

- **Node.js**: Make sure you have Node.js installed (Version 18 or higher recommended). 
  - You can download it from [nodejs.org](https://nodejs.org/).
  - To check if you have it, run `node -v` in your terminal.

### 2. Installation

Open your terminal (PowerShell, CMD, or Git Bash) in this project directory and run:

```bash
npm install
```

### 3. Environment Configuration

Check the `.env` file in the root directory. This project uses it for email functionality (contact form).
- Update `VITE_SMTP_USER` with your Gmail address.
- Update `VITE_SMTP_PASS` with an [App Password](https://support.google.com/accounts/answer/185833?hl=en) (if using Gmail).

### 4. Running the Project

To start the development server, simply run:

```bash
npm run dev
```

This will work on Windows, macOS, and Linux because I've added `cross-env` to your project.

The app will be available at [http://localhost:5000](http://localhost:5000).

## 🛠️ Project Structure

- `client/`: React frontend (Vite)
- `server/`: Express backend
- `shared/`: Shared TypeScript types and schemas
- `attached_assets/`: Images and other assets used in the site

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

Then you can start the production server with:
```bash
npm start
```
