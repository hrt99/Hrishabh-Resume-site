# Git Push Instructions (Optional)

If you want to use Git commands instead of web upload:

## Install Git First
Download from: https://git-scm.com/download/win

## Then Use These Commands:

```powershell
# Navigate to your portfolio folder
cd "C:\Users\htripathi5\Downloads\RESUME\Hrishabh RESUME  site\portfolio-site"

# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio upload with 16 certifications"

# Add your GitHub repository as remote
git remote add origin https://github.com/hrt99/Hrishabh-Resume-site.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Authentication
When prompted:
- **Username:** hrt99
- **Password:** Use Personal Access Token (not your GitHub password)

### Create Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Select "repo" scope
4. Copy token and use as password

---

## But Honestly...

**Web upload is easier if you don't have Git installed!**

Just drag and drop files on GitHub.com - no commands needed.
