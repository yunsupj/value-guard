# Cloudflare Pages Deployment Guide

## ⚡ Automated Deployment Pipeline

ValueGuard is configured for **Cloudflare Pages** with automatic deployment on every `git push`.

### Initial Setup (One-Time)

1. **Connect GitHub to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub repository: `yunsupj/value-guard`

2. **Build Configuration:**
   ```
   Build command:    npm run build
   Build output:     dist
   Root directory:   (leave empty)
   Environment:      Production
   ```

3. **Environment Variables:**
   ```
   NODE_VERSION = 18
   ```

4. **Custom Domain (Optional):**
   - Add custom domain: `valueguard.dev`
   - Cloudflare will auto-configure DNS and SSL

### Deployment Process

Every time you push to the `master` branch:

```bash
git add .
git commit -m "Your update message"
git push origin master
```

Cloudflare Pages will automatically:
1. Detect the push via GitHub webhook
2. Run `npm install`
3. Execute `npm run build`
4. Deploy the `dist/` folder globally
5. Update your live site in ~60 seconds

### Build Output

- **Static Assets:** `dist/`
- **Sitemap:** Auto-generated at `/sitemap-index.xml`
- **Performance Headers:** Configured via `public/_headers`
- **SEO:** `robots.txt` included

### Performance Optimizations

✅ **Global Edge Network** - 275+ data centers  
✅ **HTTP/3 & QUIC** - Enabled by default  
✅ **Brotli Compression** - Automatic  
✅ **Asset Caching** - 1 year cache for static files  
✅ **Security Headers** - XSS, clickjacking protection  

### Monitoring

- **Analytics:** Cloudflare Pages Dashboard → Analytics
- **Build Logs:** Real-time logs for every deployment
- **Rollback:** One-click rollback to any previous deployment

### Custom Optimizations Applied

1. **`.node-version`** - Pins Node.js to v18
2. **`public/_headers`** - Security & caching headers
3. **Sitemap Integration** - SEO-ready XML sitemap
4. **Inlined Styles** - Faster initial render

---

## 🚀 Quick Deploy Checklist

- [x] Astro project initialized
- [x] React + Tailwind configured
- [x] Git repository connected
- [x] .gitignore properly configured
- [x] Build scripts ready (`npm run build`)
- [x] Performance headers added
- [x] SEO files (robots.txt, sitemap)
- [ ] **Action Required:** Connect GitHub to Cloudflare Pages (one-time setup)

---

**After Cloudflare Pages is connected, every `git push` will trigger a new deployment automatically.**
