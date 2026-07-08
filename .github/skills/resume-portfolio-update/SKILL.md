---
name: resume-portfolio-update
description: 'Update resume and portfolio site with new content and automatically push to GitHub. Use for: add skill to resume, update resume content, add technology, update portfolio site, change site text, fix site styling, update resume and push, sync resume with site.'
argument-hint: 'What to add or change (e.g., "add Terraform skill", "update experience section")'
---

# Resume & Portfolio Update Workflow

Automatically update both resume PDF and portfolio website, then push changes to GitHub.

## When to Use

- Adding new skills to resume and site
- Updating work experience or projects
- Fixing site styling or component issues
- Changing text content across resume and site
- Any change that needs to sync resume + site + GitHub

## Workflow Overview

This skill handles the complete update cycle:
1. **Edit source data** (resume_template.yaml + portfolio.json)
2. **Generate PDF** (Python script)
3. **Update site** (copy PDF + component changes)
4. **Commit & push** to GitHub

## File Locations

### Resume Files
- **Source**: `resume_template.yaml` (root)
- **Generator**: `generate_resume.pyw` (Python script)
- **Output**: `Hrishabh_Tripathi_Data Engineer.pdf` (root)

### Portfolio Site Files
- **Data**: `Hrishabh RESUME  site/portfolio-site/data/portfolio.json`
- **Resume Copy**: `Hrishabh RESUME  site/portfolio-site/public/Hrishabh_Tripathi_Data Engineer.pdf`
- **Components**: `Hrishabh RESUME  site/portfolio-site/src/components/`
- **Git Repo**: `Hrishabh RESUME  site/portfolio-site/`

## Step-by-Step Procedure

### 1. Identify Change Type

Determine what needs to be updated:
- **Skills**: Edit both `technical_skills` in YAML and `skills` array in JSON
- **Experience**: Edit `work_experience` in YAML and `experience` array in JSON
- **Projects**: Edit `projects` in both files
- **Site Components**: Edit React .tsx files in `src/components/`
- **Styling**: Edit Tailwind classes in components

### 2. Edit Source Files

**For skills/content changes:**
- Edit `resume_template.yaml` - structured YAML format
- Edit `portfolio.json` - JSON format with matching structure
- Keep both files in sync (same data in both)

**For site-only changes:**
- Edit component files (Header.tsx, Hero.tsx, Skills.tsx, etc.)
- Update Tailwind CSS classes for styling
- Modify text content directly in components

### 3. Generate Updated Resume

```bash
cd "c:\Users\htripathi5\Downloads\RESUME"
python generate_resume.pyw
```

This creates: `Hrishabh_Tripathi_Data Engineer_Updated.pdf`

### 4. Copy Resume to Site

```powershell
Copy-Item "c:\Users\htripathi5\Downloads\RESUME\Hrishabh_Tripathi_Data Engineer.pdf" `
  -Destination "c:\Users\htripathi5\Downloads\RESUME\Hrishabh RESUME  site\portfolio-site\public\Hrishabh_Tripathi_Data Engineer.pdf" `
  -Force
```

### 5. Commit and Push

```bash
cd "c:\Users\htripathi5\Downloads\RESUME\Hrishabh RESUME  site\portfolio-site"
git add -A
git commit -m "Descriptive message about changes"
git push
```

## Common Change Patterns

### Adding a Skill

**resume_template.yaml:**
```yaml
technical_skills:
  Category Name:
  - Existing Skill
  - New Skill  # Add here
```

**portfolio.json:**
```json
{
  "category": "Category Name",
  "skills": [
    "Existing Skill",
    "New Skill"  // Add here
  ]
}
```

### Adding Skill Logo (if available)

1. Add logo to: `public/Skill Images/Skill Name.jpg`
2. Skills component automatically picks it up by name

### Updating Component Text

Edit the component file directly:
- `Hero.tsx` - Landing section with title and summary
- `Experience.tsx` - Work experience cards
- `Projects.tsx` - Project descriptions
- `Contact.tsx` - Contact section text
- `SkillsWithLogos.tsx` - Skills display logic

### Styling Changes

Use Tailwind utility classes:
- Spacing: `gap-1`, `px-4`, `py-2`, `mb-4`
- Typography: `text-sm`, `font-bold`, `leading-relaxed`
- Layout: `flex`, `grid`, `hidden md:flex`
- Responsive: `sm:`, `md:`, `lg:`, `xl:` prefixes

## Quality Checks

Before pushing:
- ✅ Resume PDF generated successfully
- ✅ PDF copied to public folder
- ✅ Both YAML and JSON files in sync
- ✅ No syntax errors in edited files
- ✅ Commit message describes the change

## Troubleshooting

**PDF not updating:**
- Check Python script runs without errors
- Verify YAML syntax is valid (no tabs, proper indentation)

**Download button not working:**
- Check filename matches in DownloadButton.tsx
- Verify PDF exists in public folder

**Site not updating after push:**
- Clear browser cache (Ctrl+Shift+R)
- Check GitHub Actions for build status
- Verify changes are in main branch

**Git push rejected:**
- Pull latest changes first: `git pull`
- Resolve any merge conflicts
- Try push again

## Tips

1. **Always sync both files**: Changes to resume should also go in portfolio.json
2. **Test locally first**: Preview site changes before pushing
3. **Descriptive commits**: Use clear commit messages for tracking
4. **One feature per commit**: Don't bundle unrelated changes
5. **Check mobile view**: Test responsive behavior for styling changes

## Example Commit Messages

- ✅ "Add Terraform to resume and site skills"
- ✅ "Update work experience with new project"
- ✅ "Fix mobile navigation text wrapping"
- ✅ "Remove text justification for better readability"
- ❌ "Update stuff" (too vague)
- ❌ "Fix things" (not descriptive)
