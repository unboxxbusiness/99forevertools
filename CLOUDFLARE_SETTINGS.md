# Cloudflare Pages Build Settings - Quick Reference

## ⚠️ Important: No wrangler.toml Needed!
Cloudflare Pages projects are configured entirely through the dashboard.
The `wrangler.toml` file has been removed to avoid conflicts.

## 📋 Copy these settings EXACTLY into Cloudflare Dashboard

### Project Settings
```
Project name: 99forevertools
Production branch: main
```

### Build Configuration
```
Framework preset: Next.js (SSR)
Build command: npm run pages:build
Build output directory: .vercel/output/static
Root directory (optional): app
```

### Environment Variables
```
NODE_VERSION: 20
```

## 🚀 Where to Set These

1. Go to https://dash.cloudflare.com/
2. Click "Workers & Pages"
3. Click "Create application" → "Pages" → "Connect to Git"
4. Select repository: `unboxxbusiness/99forevertools`
5. Paste the settings above in the configuration form
6. Click "Save and Deploy"

## ✅ Expected Result

After deployment completes (3-5 minutes):
- Site live at: `https://99forevertools.pages.dev`
- All 77 pages working
- URL shortener working
- Image compressor working

## ❌ Common Mistakes

1. **Wrong build output directory**
   - ❌ `.next`
   - ❌ `out`
   - ✅ `.vercel/output/static`

2. **Wrong build command**
   - ❌ `npm run build`
   - ❌ `next build`
   - ✅ `npm run pages:build`

3. **Wrong root directory**
   - ❌ Leave empty or `/`
   - ✅ `app`

4. **Node version too old**
   - ❌ Node 16 or lower
   - ✅ Node 18 or 20

## 🔄 Redeploying After Errors

If you already created the project with wrong settings:

1. Go to your project in Cloudflare Pages
2. Click "Settings" → "Builds & deployments"
3. Update the configuration
4. Click "Save"
5. Go to "Deployments" tab
6. Click "Retry deployment" on the failed build

OR

1. Go to "Settings" → "Builds & deployments"
2. Scroll to "Build configurations"
3. Click "Edit configurations"
4. Update the settings
5. Click "Save"
6. Trigger new deployment by pushing to GitHub:
   ```powershell
   git commit --allow-empty -m "Trigger rebuild"
   git push
   ```

## 📞 Need Help?

If deployment still fails:
1. Check build logs in Cloudflare dashboard
2. Verify all files are committed: `git status`
3. Test build locally: `cd e:\99tools\app && npm run pages:build`
4. Contact Cloudflare support: https://cfl.re/3WgEyrH
