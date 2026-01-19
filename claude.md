In all interactions and commit messages, be extremely concise and sacrifice grammar for concision.

# Agent Skills Guide

Skills = reusable instructions Claude loads on-demand via `skill` tool.

## Structure

```
.claude/skills/<name>/SKILL.md
```

Directory name MUST match frontmatter `name`.

## SKILL.md Format

```yaml
---
name: my-skill          # required, 1-64 chars
description: ...        # required, 1-1024 chars
license: MIT            # optional
compatibility: opencode # optional
metadata:               # optional, string-to-string map
  key: value
---

# Instructions here (markdown)
```

## Name Rules

- lowercase alphanumeric + hyphens only
- no leading/trailing/consecutive hyphens
- regex: `^[a-z0-9]+(-[a-z0-9]+)*$`
- no "anthropic" or "claude" in name

## Description Rules

- third person only ("Processes X" not "I process X")
- include WHAT it does AND WHEN to use it
- be specific, include key terms for discovery

Bad: `Helps with documents`
Good: `Extract text and tables from PDF files, fill forms. Use when working with PDFs or document extraction.`

## Progressive Disclosure

Level 1: metadata (always loaded, ~100 tokens)
Level 2: SKILL.md body (loaded when triggered, <5k tokens)
Level 3: bundled files (loaded as needed, unlimited)

Keep SKILL.md <500 lines. Split large content into separate files.

```markdown
## Quick start
[basic instructions]

## Advanced
See [FORMS.md](FORMS.md) for form filling
See [REFERENCE.md](REFERENCE.md) for API details
```

Keep references ONE level deep from SKILL.md.

## File Organization

```
skill-name/
├── SKILL.md           # main (required)
├── REFERENCE.md       # loaded as needed
├── EXAMPLES.md        # loaded as needed
└── scripts/
    └── helper.py      # executed, not loaded into context
```

## Best Practices

### Be Concise
- Claude is smart, skip obvious explanations
- every token competes with conversation history
- only add context Claude doesn't already have

### Degrees of Freedom
- high: multiple approaches valid, use text guidance
- medium: preferred pattern exists, use pseudocode/templates
- low: fragile/critical ops, use exact scripts

### Scripts vs Instructions
- scripts: deterministic, reliable, no context cost (output only)
- instructions: flexible, context-dependent decisions

### Feedback Loops
```markdown
1. Run validator: `python validate.py`
2. If errors, fix and re-run
3. Only proceed when validation passes
```

### Workflows
```markdown
## Workflow
- [ ] Step 1: analyze
- [ ] Step 2: validate
- [ ] Step 3: execute
- [ ] Step 4: verify
```

## Anti-patterns

- windows paths (`\` instead of `/`)
- time-sensitive info ("after August 2025...")
- vague descriptions
- deeply nested references
- too many options without defaults
- assuming packages installed
- magic numbers without docs

## Templates

### Basic Skill

```markdown
---
name: process-data
description: Process CSV data files and generate reports. Use when user mentions CSV, data processing, or report generation.
---

# Process Data

## Quick start
[core instructions]

## Examples
Input: ...
Output: ...
```

### Skill with Scripts

```markdown
---
name: pdf-forms
description: Fill PDF forms programmatically. Use when user needs to populate PDF form fields.
---

# PDF Forms

## Workflow
1. Analyze: `python scripts/analyze.py input.pdf`
2. Edit fields.json with values
3. Validate: `python scripts/validate.py fields.json`
4. Fill: `python scripts/fill.py input.pdf fields.json output.pdf`

## Scripts
- `analyze.py`: extract form fields to JSON
- `validate.py`: check field mapping
- `fill.py`: apply values to PDF
```

### Domain-Organized Skill

```markdown
---
name: bigquery-analysis
description: Query BigQuery datasets for business metrics. Use for SQL queries, data analysis, or business intelligence tasks.
---

# BigQuery Analysis

## Datasets
- Finance: [reference/finance.md](reference/finance.md)
- Sales: [reference/sales.md](reference/sales.md)
- Product: [reference/product.md](reference/product.md)

## Quick search
```bash
grep -i "revenue" reference/finance.md
```
```

## Checklist

- [ ] name matches directory name
- [ ] name follows regex rules
- [ ] description is third person
- [ ] description says what AND when
- [ ] SKILL.md <500 lines
- [ ] references one level deep
- [ ] no time-sensitive content
- [ ] consistent terminology
- [ ] scripts have error handling
- [ ] forward slashes in paths
