# 📦 Node.js Installation Guide

## ⚠️ Node.js Not Found

Your system needs Node.js to build and deploy the portfolio site.

---

## 🔽 Quick Install - Node.js

### Option 1: Direct Download (Recommended)

1. **Download Node.js LTS** (Long Term Support)
   - 🌐 Visit: https://nodejs.org/
   - Click the **green "LTS" button** (currently Node.js 20.x or 22.x)
   - Choose **Windows Installer (.msi)** - 64-bit

2. **Run the installer**
   - Double-click the downloaded .msi file
   - Click "Next" through the installation wizard
   - ✅ Keep all default options checked
   - Accept the license agreement
   - Click "Install"

3. **Verify installation**
   - **Close and reopen** PowerShell/Command Prompt (important!)
   - Run: `node --version`
   - Run: `npm --version`
   - Both should show version numbers

4. **Deploy your portfolio**
   ```powershell
   cd "C:\Users\htripathi5\Downloads\RESUME\Hrishabh RESUME  site\portfolio-site"
   .\deploy.bat
   ```

---

### Option 2: Using winget (Windows Package Manager)

If you have Windows 11 or updated Windows 10:

```powershell
# Run in PowerShell as Administrator
winget install OpenJS.NodeJS.LTS
```

Then close and reopen PowerShell, and run `.\deploy.bat`

---

### Option 3: Using Chocolatey

If you have Chocolatey installed:

```powershell
# Run in PowerShell as Administrator
choco install nodejs-lts
```

---

## 🚀 Alternative: Deploy WITHOUT Installing Node.js

If you don't want to install Node.js locally, use GitHub + Vercel web interface:

### Method 1: GitHub + Vercel Dashboard (No Node.js needed!)

1. **Create GitHub Repository**
   - Go to: https://github.com/new
   - Name: `portfolio-site`
   - Click "Create repository"

2. **Upload Your Files**
   - On GitHub, click "uploading an existing file"
   - Drag and drop your entire `portfolio-site` folder
   - Click "Commit changes"

3. **Deploy with Vercel**
   - Go to: https://vercel.com/signup
   - Sign up with GitHub
   - Click "New Project"
   - Import your `portfolio-site` repository
   - Click "Deploy"
   - Done! 🎉

**Result:** Your site is live without installing anything!

---

### Method 2: Use GitHub Codespaces (Cloud-based)

1. Go to your GitHub repository
2. Click "Code" → "Codespaces" → "Create codespace"
3. Wait for environment to load (Node.js pre-installed)
4. In the terminal, run:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

**Result:** Everything runs in the cloud, no local installation needed!

---

## 🎯 Recommended Approach

### For Quick Deployment (5 minutes)
✅ **Use GitHub + Vercel Dashboard** (No Node.js installation required)

### For Full Control (15 minutes)
✅ **Install Node.js LTS** from https://nodejs.org/ then run `.\deploy.bat`

---

## ⚡ Quick Steps After Installing Node.js

1. **Close and reopen** your terminal (very important!)
2. Navigate to portfolio folder:
   ```powershell
   cd "C:\Users\htripathi5\Downloads\RESUME\Hrishabh RESUME  site\portfolio-site"
   ```
3. Run deployment:
   ```powershell
   .\deploy.bat
   ```

---

## 🔍 Troubleshooting

### "node is not recognized" (after installation)
- **Solution:** Close ALL terminal windows and open a new one
- The PATH environment variable needs to refresh

### Still having issues?
```powershell
# Check if Node.js is in PATH
$env:PATH -split ';' | Select-String -Pattern 'node'

# If nothing shows, manually add Node.js to PATH:
# Control Panel → System → Advanced → Environment Variables
# Add: C:\Program Files\nodejs\
```

### Alternative: Specify full path
```powershell
& "C:\Program Files\nodejs\node.exe" --version
& "C:\Program Files\nodejs\npm.exe" --version
```

---

## 📱 Still Stuck? Use This Shortcut

**No Node.js? No problem!**

1. **Upload to GitHub** (just drag and drop files)
2. **Connect Vercel** (one-click import)
3. **Done!** - Your site is live

**Tutorial:** https://vercel.com/docs/getting-started-with-vercel

---

## ✅ Next Steps

**After Node.js is installed:**

```powershell
# 1. Verify installation (close/reopen terminal first!)
node --version
npm --version

# 2. Navigate to portfolio
cd "C:\Users\htripathi5\Downloads\RESUME\Hrishabh RESUME  site\portfolio-site"

# 3. Deploy!
.\deploy.bat
```

**Or use GitHub + Vercel web interface (no installation needed)!**

---

## 💡 Why Node.js?

- Required to build Next.js applications
- Provides `npm` for package management
- Enables local development server
- Industry-standard for web development

**File size:** ~50 MB  
**Installation time:** ~2 minutes  
**Free and open-source**

---

**Ready to proceed?**

Option A: Install Node.js → Run `.\deploy.bat`  
Option B: Use GitHub + Vercel web interface (skip Node.js)

Choose what works best for you! 🚀
