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

## First Session

Start with the primer skill:

```
/herbrand-primer
```

This introduces the framework, installs skills as slash commands, and launches the UI workbench. The agent will guide you through:

1. **System discovery** — identify execution contexts, actors, and business processes
2. **Write `system.yaml`** — the global configuration for your project

From there, use `/herbrand-explore-process` to deep dive into each process.

## Project Structure

```
my-project/
  system.yaml                    # contexts, actors, process definitions
  processes/
    lending/
      lending-policy.yaml        # one decision per file
      lend-operation.yaml
    book-return/
      return-policy.yaml
      return-operation.yaml
  docs/
    system.md                    # enriched documentation (generated)
    processes/
      lending.md
  schemas/                       # auto-generated JSON schemas
```

## The System File

`system.yaml` declares the structural components of your system:

```yaml
contexts:
  - type: institutional
    id: library-desk
    description: Front desk where librarians serve members
    kind: role-authority

  - type: software
    id: lms
    description: Library Management System
    boundary: internal

  - type: software
    id: billing-service
    description: External billing platform
    boundary: external

actors:
  - type: human
    id: librarian
    role: Librarian

  - type: llm
    id: catalog-bot
    description: AI assistant for catalog operations

  - type: machine
    id: lending-engine
    description: Deterministic lending transaction processor

processes:
  - id: lending
    description: A member requests a book and it is lent to them
    startsWith: [book.requested]
    endsWith: [book.lent, member.loan.limit.reached]
```

**Execution contexts** define where decisions happen: software systems (internal or external) and institutional structures (role-authority, ceremony, department, committee).

**Actors** define who executes decisions: humans with roles, LLMs, or deterministic machines.

**Processes** define named narratives — perspectives through the decision graph, not structural boundaries. A decision can participate in multiple processes.

## Decision Specs

Each YAML file in `processes/` describes a single decision. There are two types:

### Policy (intent decision)

A policy listens to outcomes, evaluates preconditions, and emits an intent — *what should happen*. If preconditions aren't met, it silently drops.

```yaml
id: lending-policy
type: policy
description: When a book is requested, attempt to lend it
businessGoal: members can borrow books from the library
context: library-desk
actor: librarian
activatedBy: [book.requested]
emits: lend.book
processes: [lending]

preconditions:
  - id: book-exists
    description: The requested book must exist in the catalog
    reads: [book.exists]

  - id: member-exists
    description: The requesting member must exist
    reads: [member.exists]
```

### Operation (outcome decision)

An operation listens to intents, evaluates constraints, and produces outcomes — *what has happened*. If any constraint fails, it produces an explicit OperationFailed outcome.

```yaml
id: lend-operation
type: operation
description: Lend a book to a member
context: lms
actor: lending-engine
activatedBy: [lend.book]
processes: [lending]

constraints:
  - id: book-available
    description: Book must be available for lending
    reads: [book.available]

  - id: member-not-suspended
    description: Member must not be suspended
    reads: [member.suspended]

  - id: under-loan-limit
    description: Member must not have exceeded their loan limit
    reads: [member.active.loans, member.max.loans]

unconditionalOutcome:
  kind: book.lent
  description: The book has been lent to the member
  effects:
    - point: book.available
      description: Set to false
    - point: member.active.loans
      description: Incremented by 1
    - point: loan.due.date
      description: Set to 14 days from now

conditionalOutcomes:
  - condition:
      description: Member reached their loan limit after this loan
      reads: [member.active.loans, member.max.loans]
    outcome:
      kind: member.loan.limit.reached
      description: Member has hit their borrowing limit
      effects: []
```

### Key distinctions

| | Policy | Operation |
|---|---|---|
| Listens to | Outcomes | Intents |
| Produces | Intents (commands) | Outcomes (events) |
| On failure | Silent drop (not an event) | OperationFailed outcome |
| Guard type | Preconditions | Constraints |
| Actor | Human, LLM, or machine | LLM or machine (human in institutional contexts) |

## The Workflow

The typical workflow alternates between exploration and validation:

1. **`/herbrand-primer`** — start session, discover system structure
2. **`/herbrand-explore-process`** — deep dive per process, write YAML specs, lint loop
3. **`/herbrand-review-system`** — birds-eye analysis after processes are defined
4. **`/herbrand-challenge`** — stress-test the model for edge cases
5. **`/herbrand-enrich`** — generate prose documentation

The agent writes YAML files. Herbrand validates them instantly. The UI shows live results. Lint errors must be fixed before moving to the next stage — the pipeline gates each step.

## The UI Workbench

Launch manually:

```bash
npx herbrand-ui --folder .
```

Or let the agent launch it via the `/herbrand-primer` skill. The workbench watches your project folder and updates live as YAML files change.
