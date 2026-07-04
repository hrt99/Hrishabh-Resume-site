# 🚀 Portfolio Deployment Guide

Your portfolio site is now updated with all latest certifications and information!

## 📋 Pre-Deployment Checklist

✅ Portfolio data updated with 16 certifications  
✅ Latest work experience and skills added  
✅ Projects section updated  
⚠️ **Action Required:** Update the resume PDF in `public/uploads/`

---

## 🎯 Quick Deploy to Vercel (Recommended - 2 minutes)

### Method 1: Using Vercel CLI (Fastest)

```powershell
# 1. Navigate to portfolio folder
cd "Hrishabh RESUME  site/portfolio-site"

# 2. Install Vercel CLI globally (one-time)
npm install -g vercel

# 3. Login to Vercel (opens browser)
vercel login

# 4. Deploy to production
vercel --prod
```

**That's it!** You'll get a live URL like: `hrishabh-portfolio.vercel.app`

### Method 2: Deploy via GitHub + Vercel Dashboard

```powershell
# 1. Initialize git (if not already)
cd "Hrishabh RESUME  site/portfolio-site"
git init
git add .
git commit -m "Updated portfolio with latest certifications"

# 2. Create a GitHub repository and push
# (Create repo at https://github.com/new)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main

# 3. Go to https://vercel.com/new
# - Connect your GitHub account
# - Import your repository
# - Click "Deploy" (no configuration needed!)
```

---

## 🌐 Alternative Deployment Options

### Option 2: Netlify (Also FREE & Easy)

```powershell
# Build the site
cd "Hrishabh RESUME  site/portfolio-site"
npm run build

# Then go to https://app.netlify.com/drop
# Drag & drop the `.next` folder
```

### Option 3: Azure Static Web Apps (FREE tier)

```powershell
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy
cd "Hrishabh RESUME  site/portfolio-site"
swa deploy
```

### Option 4: GitHub Pages (FREE)

**Note:** Requires Next.js configuration change for static export

1. Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

2. Build and deploy:
```powershell
npm run build
# Push to GitHub and enable Pages in repo settings
```

---

## ⚙️ Environment Variables Setup

Before deploying, create `.env.local` in your project root:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
ADMIN_PASSWORD_HASH=$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
```

**For Vercel:**
```powershell
# Set via CLI
vercel env add JWT_SECRET
vercel env add ADMIN_PASSWORD_HASH

# Or set via Dashboard:
# Project Settings > Environment Variables
```

**Default Admin Password:** `password`

**To change password:**
```powershell
# Generate new hash
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"

# Copy the hash and update ADMIN_PASSWORD_HASH
```

---

## 📦 Missing Certificate Files

Some certificates link to Google Drive. To have them locally:

**Currently Available:**
- ✅ AI-102_Certificate.pdf
- ✅ AZ-900, DP-900, DP-203, PL-300, AI-900
- ✅ AWS Cloud Practitioner, Data Engineer, AI Practitioner
- ✅ LOMA281

**Add These to `Certificates/` folder:**
- ⬇️ DP-700 (Fabric Data Engineer)
- ⬇️ PL-400 (Power Platform Developer)
- ⬇️ Databricks Certificate
- ⬇️ SnowPro Core Certificate
- ⬇️ SQL Boot Camp Certificate
- ⬇️ Linux Complete Guide Certificate

Download from your Google Drive links and place in:
```
Hrishabh RESUME  site/portfolio-site/Certificates/
```

---

## 🔄 Update Resume PDF

Replace the old resume with your latest version:

```powershell
# Copy your latest resume to:
copy "path\to\your\latest\resume.pdf" "Hrishabh RESUME  site\portfolio-site\public\uploads\Hrishabh_Tripathi_Data_Engineer.pdf"
```

Or use the resume from your YAML generator:
```powershell
# Generate latest resume first (from RESUME folder)
python generate_resume.pyw

# Then copy to portfolio
copy "output\Hrishabh_Tripathi_Data_Engineer.pdf" "Hrishabh RESUME  site\portfolio-site\public\uploads\Hrishabh_Tripathi_Data_Engineer.pdf"
```

---

## 🧪 Test Locally Before Deploy

```powershell
cd "Hrishabh RESUME  site/portfolio-site"

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in browser

# Test admin panel at http://localhost:3000/mgmt-x7k9
```

---

## 📱 Sharing Your Portfolio

Once deployed, share your link:

**Vercel:** `https://hrishabh-portfolio.vercel.app`  
**Netlify:** `https://hrishabh-portfolio.netlify.app`  
**Azure:** `https://hrishabh-portfolio.azurestaticapps.net`

### Custom Domain (Optional)

All platforms support custom domains for FREE!

**For Vercel:**
```powershell
# Add your domain
vercel domains add yourdomain.com
```

Then add DNS records as shown in dashboard.

---

## 🎨 What's Been Updated

### ✅ Completed Updates

1. **Personal Info**
   - Updated title to: "Data Engineer | Azure | Databricks | Snowflake | SQL | Power BI"
   - Enhanced summary with Snowflake, Databricks expertise

2. **Certifications (9 → 16)**
   - Added: AI-102, DP-700, PL-400
   - Added: Databricks Data Engineer
   - Added: SnowPro Core
   - Added: SQL Boot Camp
   - Added: Linux Complete Guide

3. **Work Experience**
   - Updated DXC role with Snowflake experience
   - Added Informatica PowerCenter details
   - Enhanced automation project descriptions
   - Added Power Automate & Teams integration

4. **Skills**
   - Promoted Snowflake to top of Data Warehousing
   - Added Databricks to BI section
   - Added PySpark to Data Integration
   - Added Informatica PowerCenter

5. **Projects**
   - Updated to reflect real enterprise projects
   - Added Snowflake pipeline project
   - Added Power Automate automation
   - Added Python automation suite

---

## 🆘 Troubleshooting

### Build Errors
```powershell
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```powershell
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```powershell
# Reinstall dependencies
npm install --legacy-peer-deps
```

---

## 📧 Support

Need help? Your updated portfolio is ready to deploy!

**Recommended Next Steps:**
1. ✅ Run `npm install` in portfolio folder
2. ✅ Test locally with `npm run dev`
3. ✅ Deploy to Vercel with `vercel --prod`
4. ✅ Share your link!

---

**Last Updated:** 2026-07-04  
**Portfolio Version:** 2.0 (Updated with 16 certifications)
