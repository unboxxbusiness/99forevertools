# Cloudflare Pages Deployment Guide for 99forevertools

## ⚠️ Important Note
The build configuration MUST be set in the Cloudflare Pages dashboard, not in `wrangler.toml`. 
Cloudflare Pages projects do not support the `[build]` section in wrangler.toml.

## ✅ Issue Fixed

The HTTP 404 error occurred because the site was not deployed yet. The build errors have been resolved:
- ✅ Sitemap dynamic export issue fixed
- ✅ Dynamic route `/r/[slug]` configuration updated
- ✅ Build now completes successfully with all 77 pages
- ✅ Fixed wrangler.toml configuration error

## 🚀 Deployment Options

### Option 1: Deploy via Cloudflare Dashboard (Recommended for First Time)

1. **Go to Cloudflare Pages**
   - Visit: https://dash.cloudflare.com/
   - Click "Workers & Pages" in the left sidebar
   - Click "Create application" → "Pages" → "Connect to Git"

2. **Connect GitHub Repository**
   - Authorize Cloudflare to access your GitHub account
   - Select repository: `unboxxbusiness/99forevertools`
   - Click "Begin setup"

3. **Configure Build Settings**
   ```
   Project name: 99forevertools
   Production branch: main
   Framework preset: Next.js
   Build command: npm run pages:build
   Build output directory: .vercel/output/static
   Root directory: app
   Node.js version: 18.x or 20.x
   ```

   **Important**: The build command MUST be set in the Cloudflare dashboard, not in wrangler.toml.
   Cloudflare Pages projects do not support the [build] section in wrangler.toml.

4. **Environment Variables** (if needed)
   - No environment variables required for basic deployment
   - Add any API keys if you're using external services

5. **Save and Deploy**
   - Click "Save and Deploy"
   - First build takes 3-5 minutes
   - Site will be live at: `https://99forevertools.pages.dev`

### Option 2: Deploy with Wrangler CLI

1. **Install Wrangler**
   ```powershell
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```powershell
   wrangler login
   ```

3. **Build and Deploy**
   ```powershell
   cd e:\99tools\app
   npm run deploy
   ```

### Option 3: Automatic Deployment with GitHub Actions

The `.github/workflows/deploy.yml` file is already configured for automatic deployments.

**Setup Steps:**

1. **Get Cloudflare API Token**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use template: "Edit Cloudflare Workers"
   - Or create custom token with permissions:
     - Account > Cloudflare Pages > Edit

2. **Get Cloudflare Account ID**
   - Go to: https://dash.cloudflare.com/
   - Click on "Workers & Pages"
   - Your Account ID is shown in the URL or right sidebar

3. **Add GitHub Secrets**
   - Go to: https://github.com/unboxxbusiness/99forevertools/settings/secrets/actions
   - Add these secrets:
     - `CLOUDFLARE_API_TOKEN`: Your API token from step 1
     - `CLOUDFLARE_ACCOUNT_ID`: Your account ID from step 2

4. **Push to GitHub**
   ```powershell
   cd e:\99tools\app
   git add .
   git commit -m "Add Cloudflare Pages deployment configuration"
   git push
   ```

5. **Automatic Deployment**
   - Every push to `main` branch will trigger automatic deployment
   - Check progress in GitHub Actions tab
   - Deployments take 3-5 minutes

## 📝 Configuration Files Created

1. **`wrangler.toml`** - Cloudflare Pages configuration
2. **`.github/workflows/deploy.yml`** - GitHub Actions workflow for auto-deployment
3. **`package.json`** - Added deployment scripts:
   - `npm run pages:build` - Build for Cloudflare Pages
   - `npm run preview` - Preview locally
   - `npm run deploy` - Deploy to Cloudflare

## 🔧 Build Configuration

The app uses `@cloudflare/next-on-pages` adapter which:
- Converts Next.js app to Cloudflare Workers
- Supports Server-Side Rendering (SSR)
- Supports dynamic routes like `/r/[slug]`
- Supports API routes
- Works with Next.js 15.x

## 📊 What Gets Deployed

- **77 static pages** - All tool pages pre-rendered
- **1 dynamic route** - `/r/[slug]` for URL redirects
- **Sitemap** - `/sitemap.xml` for SEO
- **All assets** - Images, CSS, JavaScript optimized

## 🌐 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your Cloudflare Pages project
2. Click "Custom domains"
3. Add your domain (e.g., `99forevertools.com`)
4. Follow DNS configuration instructions

## 🐛 Troubleshooting

### "Configuration file for Pages projects does not support 'build'" Error
**Solution**: Remove the `[build]` section from `wrangler.toml`. The build configuration must be set in the Cloudflare Pages dashboard under "Settings" → "Builds & deployments".

### Build Fails
- Check Node.js version is 18.x or 20.x
- Verify all dependencies are installed: `npm install`
- Check build logs in Cloudflare dashboard
- Ensure build command is set to: `npm run pages:build`
- Ensure build output is set to: `.vercel/output/static`

### 404 Errors After Deployment
- Wait 2-3 minutes for DNS propagation
- Clear browser cache
- Check Cloudflare Pages dashboard for deployment status

### Dynamic Routes Not Working
- Ensure `@cloudflare/next-on-pages` is installed
- Check `wrangler.toml` configuration
- Verify build command is `npm run pages:build`

## 📱 Testing Locally Before Deploy

```powershell
cd e:\99tools\app

# Build for Cloudflare
npm run pages:build

# Preview locally
npm run preview
```

## 🎉 Expected Result

After successful deployment:
- ✅ Site available at: `https://99forevertools.pages.dev`
- ✅ All 77 pages working
- ✅ URL shortener `/r/[slug]` working
- ✅ Image compressor and all tools functional
- ✅ Automatic deployments on every push to main

## 📈 Performance

Expected metrics:
- **Build time**: 3-5 minutes
- **Deploy time**: 1-2 minutes
- **Page load**: <2 seconds
- **Lighthouse score**: 90+ (after optimization)

## 🔐 Security

- All processing happens client-side (images, calculations)
- No sensitive data stored
- HTTPS by default
- DDoS protection included with Cloudflare

---

Need help? Check:
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Next.js on Cloudflare: https://developers.cloudflare.com/pages/framework-guides/nextjs/
