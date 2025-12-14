<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Fanciaga - Progressive Web App

A modern Progressive Web App (PWA) built with React, Vite, and TypeScript. This app can be installed on devices and works offline.

View your app in AI Studio: https://ai.studio/apps/drive/1JI7hykEvJHsToj06_xCP4vHMObC8q41A

## Features

- ✨ Progressive Web App (PWA) support
- 📱 Installable on mobile and desktop devices
- 🔄 Offline functionality with service workers
- 🎨 Dark mode support
- ⚡ Fast and optimized with Vite

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

## Deploy to GitHub

1. Initialize git repository (if not already):
   ```bash
   git init
   ```

2. Add all files:
   ```bash
   git add .
   ```

3. Commit your changes:
   ```bash
   git commit -m "Initial commit: PWA setup"
   ```

4. Create a new repository on GitHub

5. Add your remote and push:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the Vite configuration
5. Add your environment variables (e.g., `GEMINI_API_KEY`) in the project settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

### Environment Variables

Make sure to add your environment variables in Vercel:
- Go to your project settings → Environment Variables
- Add `GEMINI_API_KEY` with your API key value

## PWA Features

This app is configured as a Progressive Web App with:

- **Service Worker**: Enables offline functionality and caching
- **Web App Manifest**: Allows installation on devices
- **App Icons**: Automatically generated icons for various devices
- **Offline Support**: Caches assets for offline access

### Installing the PWA

**On Mobile:**
- iOS Safari: Tap the Share button → "Add to Home Screen"
- Android Chrome: Tap the menu → "Add to Home Screen" or "Install App"

**On Desktop:**
- Chrome/Edge: Click the install icon in the address bar
- The app will appear in your applications menu

## Project Structure

```
fanciaga/
├── components/      # React components
├── context/         # React context providers
├── pages/           # Page components
├── public/          # Static assets (PWA icons, etc.)
├── App.tsx          # Main app component
├── index.tsx        # Entry point
├── vite.config.ts   # Vite configuration with PWA plugin
└── vercel.json      # Vercel deployment configuration
```

## Technologies

- **React 19** - UI library
- **Vite 6** - Build tool and dev server
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **vite-plugin-pwa** - PWA support
- **Tailwind CSS** - Styling

## License

MIT
