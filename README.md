<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Fanciaga - Progressive Web App

Fanciaga is a modern social platform built with React, TypeScript, and Vite. This app is configured as a Progressive Web App (PWA) with offline support, installable on mobile and desktop devices.

View your app in AI Studio: https://ai.studio/apps/drive/1JI7hykEvJHsToj06_xCP4vHMObC8q41A

## ✨ Features

### Progressive Web App (PWA)
- **Offline Support**: Works offline with service worker caching
- **Installable**: Add to home screen on mobile and desktop devices
- **Auto-updates**: Service worker automatically updates when new versions are available
- **App-like Experience**: Standalone display mode for native app feel
- **Optimized Caching**: Smart caching strategy for fonts, CDN resources, and static assets

### Core Features
- Modern React 19 with TypeScript
- Dark mode support
- Responsive design
- Social media functionality (chat, posts, profiles)
- Real-time messaging

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
   
   If you encounter dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Generate PWA Icons:**
   
   Before building, you need to generate the required PNG icons:
   - Open `public/generate-icons.html` in your browser
   - Click "Use Default Icon" or upload your own SVG
   - Click "Generate Icons" to download `icon-192x192.png` and `icon-512x512.png`
   - Place both files in the `public/` directory

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

5. **Build for production:**
   ```bash
   npm run build
   ```

   The production build will be in the `dist/` directory.

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Visit your deployed app
2. Click the install icon in the address bar
3. Or go to Settings → Apps → Install this site as an app

### Mobile (iOS)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

### Mobile (Android)
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen" or "Install App"

## 🚢 Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure PWA for Vercel"
   git push origin main
   ```

2. **Import project on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings from `vercel.json`

3. **Configure environment variables:**
   - In project settings, go to "Environment Variables"
   - Add `GEMINI_API_KEY` with your API key
   - Select all environments (Production, Preview, Development)

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Confirm settings (auto-detected from `vercel.json`)
   - Add environment variables when prompted

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Environment Variables

The following environment variables are required:

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Gemini API key for AI features | Yes |

Set these in:
- **Local development**: `.env.local` file
- **Vercel**: Project Settings → Environment Variables

## 📁 Project Structure

```
fanciaga/
├── public/
│   ├── icon.svg              # Source SVG icon
│   ├── icon.png              # Existing icon
│   ├── icon-192x192.png      # PWA icon (192x192) - generate this
│   ├── icon-512x512.png      # PWA icon (512x512) - generate this
│   ├── favicon.ico           # Browser favicon
│   └── generate-icons.html   # Icon generation tool
├── components/               # React components
├── context/                  # React context providers
├── pages/                    # Page components
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration with PWA plugin
├── vercel.json               # Vercel deployment configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### PWA Development

The PWA plugin is configured but disabled in development mode by default. To test PWA features:

1. Build the app: `npm run build`
2. Preview: `npm run preview`
3. Test service worker and manifest in browser DevTools

## 📚 Additional Documentation

For detailed deployment instructions, troubleshooting, and PWA configuration, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🔧 Troubleshooting

### PWA Icons Not Showing
- Ensure `icon-192x192.png` and `icon-512x512.png` exist in `public/`
- Use `public/generate-icons.html` to generate them
- Clear browser cache and service worker

### Build Errors
- Run `npm install --legacy-peer-deps` if you encounter peer dependency issues
- Ensure all environment variables are set
- Check that `vite-plugin-pwa` is installed

### Service Worker Not Updating
- Clear browser cache and service worker storage
- Check browser console for service worker errors
- Verify `registerType: 'autoUpdate'` in `vite.config.ts`

## 📄 License

This project is private and proprietary.
