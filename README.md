# Agent Skills

Reusable skills for Claude and other AI agents.

## Install

```bash
# List available skills
curl -fsSL https://raw.githubusercontent.com/prichodko/agent-skills/main/install | bash -s --

# Install specific skills
curl -fsSL https://raw.githubusercontent.com/prichodko/agent-skills/main/install | bash -s -- agent-browser watch-dir

# Custom target directory
curl -fsSL https://raw.githubusercontent.com/prichodko/agent-skills/main/install | bash -s -- --target .opencode/skills agent-browser
```

## Available Skills

| Skill | Description |
|-------|-------------|
| `agent-browser` | Browser automation for web testing, form filling, screenshots |
| `create-pr` | Generate PR description from commits/diff, confirm, create PR |
| `watch-dir` | Watch directories for file changes |

## Structure

```
.claude/skills/<name>/
├── SKILL.md      # required
├── script.ts     # optional
└── ...
```

## Creating Skills

See [claude.md](claude.md) for skill authoring guide.
