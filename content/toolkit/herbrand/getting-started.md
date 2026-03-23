---
title: "Getting Started"
weight: 2
toc: true
---

## Installation

Add the MCP server to your AI assistant:

### Claude Code CLI

```bash
claude mcp add herbrand -- npx -y herbrand-mcp
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "herbrand": {
      "command": "npx",
      "args": ["-y", "herbrand-mcp"]
    }
  }
}
```

### OpenCode

```bash
opencode mcp add herbrand -- npx -y herbrand-mcp
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "herbrand": {
      "command": "npx",
      "args": ["-y", "herbrand-mcp"]
    }
  }
}
```

### GitHub Copilot (VS Code)

Add to `.vscode/mcp.json` in your project root:

```json
{
  "servers": {
    "herbrand": {
      "command": "npx",
      "args": ["-y", "herbrand-mcp"]
    }
  }
}
```

### Manual

```bash
npx herbrand-mcp
```

On startup, the MCP server installs skills, generates JSON schemas for YAML validation, configures VS Code schema support, watches for file changes, and launches the UI workbench.

## Project Structure

```
my-project/
  project.hb.yaml     # stream declarations
  specs/
    *.hb.yaml          # decision specs
  project.schema.json  # auto-generated
  decision.schema.json # auto-generated
```

## The Project File

`project.hb.yaml` declares the vocabulary of your system:

```yaml
outcomes:         # past-tense domain events (snake_case)
intents:          # imperative commands (snake_case)
info:             # named information units (snake_case)
outcomeRejects:   # failure constraint tags (snake_case)
contexts:         # semantic boundaries (snake_case)
modules:          # consistency boundaries (snake_case)
aggregates:       # transactional boundaries (kebab-case)
```

## Decision Specs

Each `.hb.yaml` file in `specs/` describes a single decision. There are two types:

### Intent Decision

A human (or automation) observes an outcome and decides to act:

```yaml
type: intent
agent: human
role: product_owner
context: ordering
module: order_management
aggregate: order
businessGoal: initiate the fulfilment process
trigger: order_placed
preconditions:
  - description: Order has all required items
    requiredInfo: [order_items, customer_address]
    scenarios:
      - description: Complete order with valid address
producesIntent: fulfil_order
```

### Outcome Decision

The system evaluates an intent and produces outcomes:

```yaml
type: outcome
agent: machine
context: ordering
module: order_management
aggregate: order
trigger: fulfil_order
shouldFailWith:
  out_of_stock:
    description: One or more items are not available
    requiredInfo: [inventory_levels]
    scenarios:
      - description: Item quantity exceeds stock
shouldSucceedWith:
  order_fulfilled:
    condition: always
    description: All items allocated and shipment initiated
    requiredInfo: [order_items, inventory_levels]
    scenarios:
      - description: All items in stock
shouldAssert:
  - tag: inventory_updated
    description: Stock levels reflect allocated items
    affectedInfo: [inventory_levels]
```

Key distinction: intent precondition failures are silent skips (non-events). Outcome constraint failures are rejection events that enter the stream and can trigger other decisions.
