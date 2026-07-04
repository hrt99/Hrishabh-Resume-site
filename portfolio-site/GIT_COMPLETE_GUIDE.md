# 📚 Complete Git Commands Guide
## For GitHub & Bitbucket

All the commands you need for version control with GitHub and Bitbucket.

---

## 🎯 Quick Reference Card

| Task | Command |
|------|---------|
| **Check status** | `git status` |
| **Add all files** | `git add .` |
| **Commit changes** | `git commit -m "message"` |
| **Push to remote** | `git push` |
| **Pull from remote** | `git pull` |
| **Clone repository** | `git clone <url>` |
| **Create branch** | `git branch <name>` |
| **Switch branch** | `git checkout <name>` |
| **Merge branch** | `git merge <branch>` |
| **View history** | `git log` |

---

## 📥 INITIAL SETUP

### One-Time Configuration

```bash
# Set your name and email (shows up in commits)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check configuration
git config --list

# Set default branch name to 'main'
git config --global init.defaultBranch main

# Enable colored output
git config --global color.ui auto
```

---

## 🆕 STARTING A NEW PROJECT

### Option 1: Create New Repository Locally

```bash
# Navigate to your project folder
cd "C:\Users\htripathi5\Downloads\MyProject"

# Initialize Git repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/username/repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option 2: Clone Existing Repository

```bash
# Clone from GitHub
git clone https://github.com/username/repo-name.git

# Clone from Bitbucket
git clone https://bitbucket.org/username/repo-name.git

# Navigate into cloned folder
cd repo-name
```

---

## 📝 DAILY WORKFLOW COMMANDS

### 1. Check What Changed

```bash
# See modified files
git status

# See detailed changes in files
git diff

# See changes in specific file
git diff filename.txt
```

### 2. Stage Files (Prepare for Commit)

```bash
# Add all changed files
git add .

# Add specific file
git add filename.txt

# Add all files of certain type
git add *.js

# Add all files in folder
git add src/

# Remove file from staging (unstage)
git reset filename.txt
```

### 3. Commit Changes (Save Snapshot)

```bash
# Commit with message
git commit -m "Description of changes"

# Commit with detailed message
git commit -m "Title" -m "Detailed description here"

# Add and commit in one step
git commit -am "Message"

# Amend last commit (fix message or add forgotten files)
git commit --amend -m "New message"
```

### 4. Push Changes (Upload to GitHub/Bitbucket)

```bash
# Push to remote repository
git push

# Push to specific branch
git push origin main

# Push and set upstream (first time)
git push -u origin main

# Force push (use with caution!)
git push -f origin main

# Push all branches
git push --all
```

### 5. Pull Changes (Download from GitHub/Bitbucket)

```bash
# Pull latest changes
git pull

# Pull from specific branch
git pull origin main

# Pull and rebase (cleaner history)
git pull --rebase

# Fetch changes without merging
git fetch

# See what was fetched
git fetch && git log HEAD..origin/main
```

---

## 🌿 BRANCH MANAGEMENT

### Create & Switch Branches

```bash
# List all branches
git branch

# List all branches (including remote)
git branch -a

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# Switch to main branch
git checkout main

# Delete branch (local)
git branch -d feature-name

# Force delete branch
git branch -D feature-name

# Delete remote branch
git push origin --delete feature-name
```

### Merge Branches

```bash
# Switch to target branch (e.g., main)
git checkout main

# Merge feature branch into main
git merge feature-name

# Abort merge if conflicts
git merge --abort

# See merged branches
git branch --merged

# See unmerged branches
git branch --no-merged
```

---

## 🔄 SYNCING WITH REMOTE

### View Remote Repositories

```bash
# List remote repositories
git remote -v

# Add remote repository
git remote add origin https://github.com/username/repo.git

# Change remote URL
git remote set-url origin https://github.com/username/new-repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream
```

### Working with Multiple Remotes

```bash
# Add GitHub as origin
git remote add origin https://github.com/username/repo.git

# Add Bitbucket as backup
git remote add bitbucket https://bitbucket.org/username/repo.git

# Push to both
git push origin main
git push bitbucket main

# Pull from GitHub
git pull origin main
```

---

## 🔍 VIEWING HISTORY & CHANGES

### View Commit History

```bash
# View commit history
git log

# One-line compact view
git log --oneline

# View last 5 commits
git log -5

# View commits with file changes
git log --stat

# View commits with actual changes
git log -p

# View commits by author
git log --author="Your Name"

# View commits in date range
git log --since="2024-01-01" --until="2024-12-31"

# Graphical view of branches
git log --graph --oneline --all
```

### View Specific Changes

```bash
# See changes in working directory
git diff

# See staged changes
git diff --staged

# Compare two branches
git diff main feature-name

# See changes in specific file
git diff filename.txt

# See who changed each line of a file
git blame filename.txt
```

---

## ⏪ UNDOING CHANGES

### Discard Changes

```bash
# Discard changes in working directory (single file)
git checkout -- filename.txt

# Discard all changes in working directory
git checkout .

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Preview what will be removed
git clean -n
```

### Undo Commits

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo last 3 commits
git reset --hard HEAD~3

# Revert commit (creates new commit)
git revert <commit-hash>

# Reset to specific commit
git reset --hard <commit-hash>
```

### Restore Files

```bash
# Restore file from last commit
git restore filename.txt

# Restore file from specific commit
git restore --source=<commit-hash> filename.txt

# Unstage file
git restore --staged filename.txt
```

---

## 🏷️ TAGS (VERSIONING)

```bash
# List all tags
git tag

# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag specific commit
git tag -a v1.0.0 <commit-hash> -m "Message"

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push --tags

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0

# Checkout specific tag
git checkout v1.0.0
```

---

## 🔐 AUTHENTICATION

### GitHub Personal Access Token

```bash
# When prompted for password, use Personal Access Token instead

# Create token at:
# GitHub → Settings → Developer settings → Personal access tokens

# Use token as password when pushing/pulling
```

### Save Credentials (Windows)

```bash
# Store credentials
git config --global credential.helper wincred

# Or use manager-core
git config --global credential.helper manager-core

# Clear stored credentials
git credential-manager-core erase
```

### SSH Authentication (Alternative)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key

# Use SSH URL instead of HTTPS
git remote set-url origin git@github.com:username/repo.git
```

---

## 🚨 TROUBLESHOOTING COMMON ISSUES

### Issue: Merge Conflicts

```bash
# 1. Pull latest changes
git pull

# 2. Git shows conflict - open files with <<<< ==== >>>> markers

# 3. Manually resolve conflicts in files

# 4. Mark as resolved
git add .

# 5. Complete merge
git commit -m "Resolved merge conflicts"

# Or abort merge
git merge --abort
```

### Issue: Push Rejected (Remote has Changes)

```bash
# Option 1: Pull first, then push
git pull
git push

# Option 2: Pull with rebase
git pull --rebase
git push

# Option 3: Force push (DANGEROUS - overwrites remote)
git push --force
```

### Issue: Accidentally Committed to Wrong Branch

```bash
# 1. Create new branch from current state
git branch correct-branch

# 2. Reset current branch
git reset --hard HEAD~1

# 3. Switch to correct branch
git checkout correct-branch
```

### Issue: Need to Undo Public Commit

```bash
# Don't use reset for public commits - use revert instead
git revert <commit-hash>
git push
```

### Issue: Large Files / Slow Push

```bash
# See file sizes
git ls-files | xargs ls -l | sort -k5 -rn | head -10

# Remove large file from history (use BFG Repo Cleaner or git-filter-branch)
# Better: use Git LFS for large files
git lfs install
git lfs track "*.pdf"
```

---

## 📊 GITHUB vs BITBUCKET - KEY DIFFERENCES

| Feature | GitHub | Bitbucket |
|---------|--------|-----------|
| **URL Format** | `https://github.com/user/repo.git` | `https://bitbucket.org/user/repo.git` |
| **Free Private Repos** | ✅ Unlimited | ✅ Unlimited |
| **SSH Format** | `git@github.com:user/repo.git` | `git@bitbucket.org:user/repo.git` |
| **Web Interface** | github.com | bitbucket.org |
| **Default Branch** | `main` | `master` (older repos) |
| **CLI Tool** | GitHub CLI (`gh`) | Bitbucket CLI (`bb`) |
| **Authentication** | Token or SSH | Token, SSH, or App Password |

**Git commands are the SAME for both!**

---

## 🎯 COMPLETE WORKFLOW EXAMPLE

### Scenario: Working on a New Feature

```bash
# 1. Start with latest code
git checkout main
git pull

# 2. Create feature branch
git checkout -b feature-update-portfolio

# 3. Make changes to files
# ... edit files ...

# 4. Check what changed
git status
git diff

# 5. Stage changes
git add .

# 6. Commit changes
git commit -m "Added new certifications to portfolio"

# 7. Push feature branch
git push -u origin feature-update-portfolio

# 8. Switch back to main
git checkout main

# 9. Merge feature
git merge feature-update-portfolio

# 10. Push to main
git push origin main

# 11. Delete feature branch
git branch -d feature-update-portfolio
git push origin --delete feature-update-portfolio
```

---

## 💡 BEST PRACTICES

### ✅ DO:

- **Commit often** with clear messages
- **Pull before push** to avoid conflicts
- **Use branches** for features
- **Write descriptive** commit messages
- **Review changes** before committing (`git diff`)
- **Keep commits small** and focused
- **Use `.gitignore`** for files you don't want to track

### ❌ DON'T:

- **Don't commit** sensitive data (passwords, API keys)
- **Don't force push** to main/master branch
- **Don't commit** large binary files (use Git LFS)
- **Don't commit** `node_modules/` or build folders
- **Don't push** broken code to main branch
- **Don't rewrite** public history

---

## 📋 USEFUL .gitignore EXAMPLES

### For Node.js / Next.js Projects:

```gitignore
# Dependencies
node_modules/
package-lock.json

# Build output
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
```

---

## 🔗 HELPFUL RESOURCES

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Docs:** https://docs.github.com/
- **Bitbucket Docs:** https://support.atlassian.com/bitbucket-cloud/
- **Git Cheat Sheet:** https://education.github.com/git-cheat-sheet-education.pdf
- **Interactive Git Tutorial:** https://learngitbranching.js.org/

---

## 🆘 EMERGENCY COMMANDS

```bash
# HELP! I messed up everything!
# Option 1: Discard all local changes
git reset --hard HEAD
git clean -fd

# Option 2: Reset to remote state
git fetch origin
git reset --hard origin/main

# HELP! I need to go back in time
git reflog  # Find the commit hash you want
git reset --hard <commit-hash>

# HELP! I accidentally deleted a file
git checkout HEAD -- filename.txt

# HELP! I need to recover deleted branch
git reflog
git checkout -b recovered-branch <commit-hash>
```

---

**This guide covers 95% of what you'll need for Git, GitHub, and Bitbucket!**

Keep this as a reference and you'll be all set! 🚀
