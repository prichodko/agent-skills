---
name: create-pr
description: Create GitHub PR with auto-generated description from commits and diff. Use when user wants to open a pull request or needs PR description.
---

# Create PR

Generate PR description from commits/diff, confirm with user, then create PR.

## Workflow

1. **Get base branch**
   ```bash
   git remote show origin | grep "HEAD branch" | cut -d: -f2 | xargs
   ```

2. **List commits since base**
   ```bash
   git log --oneline <base>..HEAD
   ```

3. **Get full diff**
   ```bash
   git diff <base>...HEAD
   ```

4. **Analyze changes**
   - summarize what changed and why
   - group by feature/fix/refactor
   - note breaking changes if any

5. **Draft PR description**
   ```markdown
   ## Summary
   <1-3 bullet points of key changes>

   ## Changes
   <grouped list of changes>

   ## Testing
   <how to test, if applicable>
   ```

6. **Show draft to user, ask for confirmation**
   - present title and body
   - wait for approval or edits

7. **Create PR**
   ```bash
   gh pr create --title "<title>" --body "$(cat <<'EOF'
   <body>
   EOF
   )"
   ```

## Notes

- always confirm before creating PR
- use conventional commit style for title if repo uses it
- keep summary concise, details in Changes section
- link related issues if mentioned in commits
