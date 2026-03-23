---
title: "Getting Started"
weight: 2
toc: true
---

## Installation

```bash
npm install viberail
```

For AI-assisted workflows, add the MCP server:

### Claude Code CLI

```bash
claude mcp add viberail -- npx -y viberail-mcp
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "viberail": {
      "command": "npx",
      "args": ["-y", "viberail-mcp"]
    }
  }
}
```

### OpenCode

```bash
opencode mcp add viberail -- npx -y viberail-mcp
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "viberail": {
      "command": "npx",
      "args": ["-y", "viberail-mcp"]
    }
  }
}
```

### GitHub Copilot (VS Code)

Add to `.vscode/mcp.json` in your project root:

```json
{
  "servers": {
    "viberail": {
      "command": "npx",
      "args": ["-y", "viberail-mcp"]
    }
  }
}
```

### Manual

```bash
npx viberail-mcp
```

For the visual workbench:

```bash
npm install -g viberail-ui
# or run directly
npx viberail-ui --folder ./my-project
```

## Project Setup

Initialize a project with the MCP tool:

```bash
# Via MCP
init-project --projectPath ./my-project
```

This installs viberail, adds `vr:gen` and `vr:check` npm scripts, scaffolds a `docs/` directory, and copies skills to `.claude/skills/`.

## CLI Tools

```bash
# Generate documentation and dependency graphs from specs
npx viberail gen

# Validate specs across six dimensions
npx viberail check
```

`viberail check` validates: example completeness, assertion strength, orphan detection, failure union drift, step-implementation sync, and inheritance completeness. Exits with code 1 on errors.

## Quick Example

Define a spec:

```typescript
import { Spec, SpecFn } from 'viberail'

type ParseEmail = SpecFn<
  { raw: string },           // input
  { email: string },         // output
  'invalid_format',          // failure types
  'parsed'                   // success types
>

export const parseEmailSpec: Spec<ParseEmail> = {
  shouldFailWith: {
    invalid_format: [
      { input: { raw: 'not-an-email' } }
    ]
  },
  shouldSucceedWith: {
    parsed: [
      { input: { raw: 'user@example.com' }, output: { email: 'user@example.com' } }
    ]
  },
  shouldAssert: [
    (result) => result.value.email.includes('@')
  ]
}
```

Generate tests automatically:

```typescript
import { testSpec } from 'viberail'
import { parseEmailSpec } from './parse-email.spec'
import { parseEmail } from './parse-email'

testSpec('parseEmail', parseEmailSpec, parseEmail)
```

This generates Jest tests from your spec examples and assertions — no manual test writing.
