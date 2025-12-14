# Deployment Guide - Fanciaga PWA

This guide provides step-by-step instructions for deploying Fanciaga as a Progressive Web App on Vercel.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Generated PWA icons (`icon-192x192.png` and `icon-512x512.png`)
- [ ] Created `.env.local` with `GEMINI_API_KEY`
- [ ] Tested the app locally (`npm run dev`)
- [ ] Built the app successfully (`npm run build`)
- [ ] Verified PWA manifest and service worker in build output
- [ ] Committed all changes to Git
- [ ] Pushed code to GitHub repository

## 🎨 Icon Generation

### Step 1: Generate PNG Icons

The PWA requires two PNG icon sizes: 192x192 and 512x512 pixels.

**Method 1: Using the Icon Generator Tool (Recommended)**

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000/generate-icons.html` in your browser

3. Click "Use Default Icon" to load the default SVG, or:
   - Click "Select SVG File" to upload your own `icon.svg`
   - Ensure your SVG is square (1:1 aspect ratio)

4. Click "Generate Icons"

5. The browser will automatically download:
   - `icon-192x192.png`
   - `icon-512x512.png`

6. Move both files to the `public/` directory:
   ```bash
   # On Windows (PowerShell)
   Move-Item -Path "$HOME\Downloads\icon-*.png" -Destination ".\public\"
   
   # On macOS/Linux
   mv ~/Downloads/icon-*.png ./public/
   ```

**Method 2: Manual Conversion**

If you prefer to use external tools:

1. Use an online SVG to PNG converter (e.g., CloudConvert, Convertio)
2. Upload `public/icon.svg`
3. Convert to PNG with dimensions:
   - 192x192 pixels → Save as `icon-192x192.png`
   - 512x512 pixels → Save as `icon-512x512.png`
4. Place both files in the `public/` directory

**Method 3: Using ImageMagick (Command Line)**

```bash
# Install ImageMagick first, then:
convert public/icon.svg -resize 192x192 public/icon-192x192.png
convert public/icon.svg -resize 512x512 public/icon-512x512.png
```

### Step 2: Verify Icons

After generating icons, verify they exist:

```bash
# Check files exist
ls public/icon-*.png

# Should show:
# icon-192x192.png
# icon-512x512.png
```

## 🚀 Deployment to Vercel

### Prerequisites

1. **GitHub Account**: Your code must be in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier available)
3. **Environment Variables**: Have your `GEMINI_API_KEY` ready

### Method 1: Deploy via Vercel Dashboard (Recommended for First-Time)

#### Step 1: Prepare Your Repository

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Configure PWA and prepare for Vercel deployment"
   git push origin main
   ```

2. **Verify your repository is up to date:**
   - Check that `vercel.json` exists
   - Ensure `public/icon-192x192.png` and `public/icon-512x512.png` are committed
   - Verify `.gitignore` excludes `.env.local` and `.vercel`

#### Step 2: Import Project on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Click **"Import"**

#### Step 3: Configure Project Settings

Vercel will auto-detect settings from `vercel.json`, but verify:

- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build` (from vercel.json)
- **Output Directory**: `dist` (from vercel.json)
- **Install Command**: `npm install` (from vercel.json)

#### Step 4: Add Environment Variables

1. In the project configuration, scroll to **"Environment Variables"**
2. Click **"Add"** and enter:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environments**: Select all (Production, Preview, Development)
3. Click **"Save"**

#### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Once deployed, you'll see:
   - ✅ Production URL: `https://your-project.vercel.app`
   - Preview URLs for each commit

#### Step 6: Verify Deployment

1. **Visit your production URL**
2. **Test PWA features:**
   - Open DevTools (F12) → Application tab
   - Check "Manifest" section (should show app name, icons, theme color)
   - Check "Service Workers" section (should show registered service worker)
3. **Test installation:**
   - Look for install prompt in browser
   - Or use browser menu to "Install App"

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login

```bash
vercel login
```

Follow the prompts to authenticate.

#### Step 3: Deploy

From your project root directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account/team
- **Link to existing project?** → No (first time) or Yes (if updating)
- **Project name?** → Enter name or press Enter for default
- **Directory?** → `./` (press Enter)
- **Override settings?** → No (uses vercel.json)

#### Step 4: Add Environment Variables

```bash
vercel env add GEMINI_API_KEY
```

Enter your API key when prompted. Select all environments.

#### Step 5: Deploy to Production

```bash
vercel --prod
```

This creates a production deployment.

#### Step 6: Link Local Project (Optional)

If you want to manage the project locally:

```bash
vercel link
```

This creates a `.vercel` directory (already in `.gitignore`).

## 🔄 Updating Deployment

### Automatic Updates (Recommended)

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update app"
git push origin main
```

Vercel will:
1. Detect the push
2. Start a new build
3. Deploy to a preview URL
4. If on main branch, also update production

### Manual Updates

```bash
vercel --prod
```

## 🧪 Testing PWA Features

### Local Testing

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Preview:**
   ```bash
   npm run preview
   ```

3. **Test in browser:**
   - Open `http://localhost:4173` (or the port shown)
   - Open DevTools → Application tab
   - Check Manifest and Service Workers

### Production Testing

1. **Visit your Vercel URL**
2. **Open Chrome DevTools** (F12)
3. **Application Tab:**
   - **Manifest**: Verify app name, icons, theme color
   - **Service Workers**: Should show registered worker
   - **Storage**: Check cached resources
4. **Lighthouse Audit:**
   - Open DevTools → Lighthouse tab
   - Select "Progressive Web App"
   - Click "Generate report"
   - Should score 90+ for PWA

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error: Missing icons**
- **Solution**: Ensure `icon-192x192.png` and `icon-512x512.png` are in `public/` and committed to Git

**Error: Environment variable not found**
- **Solution**: Add `GEMINI_API_KEY` in Vercel project settings → Environment Variables

**Error: Dependency conflicts**
- **Solution**: Vercel uses `npm install` by default. If issues persist, add to `package.json`:
  ```json
  "scripts": {
    "vercel-build": "npm install --legacy-peer-deps && npm run build"
  }
  ```

### PWA Not Working

**Icons not showing:**
- Clear browser cache
- Check that icons exist in `public/` directory
- Verify manifest.json references correct icon paths
- Check browser console for 404 errors

**Service worker not registering:**
- Ensure app is served over HTTPS (Vercel provides this)
- Check browser console for service worker errors
- Verify `registerType: 'autoUpdate'` in `vite.config.ts`
- Clear service worker cache in DevTools → Application → Service Workers → Unregister

**App not installable:**
- Verify manifest.json is valid (check in DevTools → Application → Manifest)
- Ensure all required manifest fields are present
- Check that service worker is registered
- Test in Chrome/Edge (best PWA support)

**Offline mode not working:**
- Check service worker is active in DevTools
- Verify workbox configuration in `vite.config.ts`
- Test by going offline in DevTools → Network → Offline
- Check cached resources in DevTools → Application → Cache Storage

### Routing Issues (404 on Refresh)

**Problem**: Refreshing a route like `/home` shows 404

**Solution**: Already configured in `vercel.json` with rewrites. If issues persist:
- Verify `vercel.json` exists and has correct rewrite rules
- Check Vercel deployment logs for errors
- Ensure you're using HashRouter (already configured in `App.tsx`)

### Performance Issues

**Slow first load:**
- Check Vercel deployment region (should match your users)
- Verify CDN caching is working
- Check bundle size in Vercel build logs

**Service worker too large:**
- Review workbox configuration
- Limit cached resources
- Check `globPatterns` in `vite.config.ts`

## ✅ PWA Checklist

Use this checklist to verify your PWA is properly configured:

### Manifest
- [ ] `manifest.webmanifest` is generated in build
- [ ] App name is correct
- [ ] Short name is set
- [ ] Description is present
- [ ] Theme color matches app design (#14b8a6)
- [ ] Background color is set
- [ ] Display mode is "standalone"
- [ ] Start URL is "/"
- [ ] Icons (192x192 and 512x512) are present and valid

### Service Worker
- [ ] Service worker is registered
- [ ] Service worker updates automatically
- [ ] Offline caching works
- [ ] Runtime caching for external resources works
- [ ] Service worker doesn't cache too much (check size)

### HTML Meta Tags
- [ ] Viewport meta tag is present
- [ ] Theme color meta tag matches manifest
- [ ] Description meta tag is present
- [ ] Apple mobile web app meta tags are present
- [ ] Manifest link is present

### Icons
- [ ] `icon-192x192.png` exists in `public/`
- [ ] `icon-512x512.png` exists in `public/`
- [ ] `favicon.ico` exists (or placeholder)
- [ ] Apple touch icon link is in HTML

### Security
- [ ] App is served over HTTPS (Vercel provides this)
- [ ] Security headers are configured in `vercel.json`
- [ ] No mixed content warnings

### Testing
- [ ] App installs on desktop (Chrome/Edge)
- [ ] App installs on mobile (iOS Safari, Android Chrome)
- [ ] App works offline
- [ ] App updates automatically
- [ ] Lighthouse PWA score is 90+

## 📚 Additional Resources

- [Vite PWA Plugin Documentation](https://vite-pwa-org.netlify.app/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Web App Manifest](https://web.dev/add-manifest/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Best Practices](https://web.dev/pwa-checklist/)

## 🆘 Getting Help

If you encounter issues:

1. Check Vercel deployment logs
2. Review browser console errors
3. Verify all configuration files are correct
4. Test locally with `npm run build && npm run preview`
5. Check Vercel status page for service issues

For project-specific issues, refer to the main [README.md](./README.md).

