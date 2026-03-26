---
title: "MCP Tools"
weight: 5
toc: true
---

The Herbrand MCP server exposes seven tools. The agent writes YAML specs directly using its native file capabilities; the tools provide computed artifacts that the agent can't derive from the files alone.

## install_skills

Copies Herbrand skills into the project's platform-specific skills directories. Called once at the start of a session (automatically by the primer skill).

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `platform` | string (optional) | `claude`, `opencode`, `github`, or `cursor`. Omit for all. |

**Targets:** `.claude/skills/`, `.opencode/skills/`, `.github/skills/`, `.cursor/skills/`

## launch_ui

Launches the Herbrand UI workbench in the browser, pointed at the current project folder.

**Parameters:** none

## get_system_overview

Returns the birds-eye summary — the index for scoped requests. Shows what exists so the agent knows how to ask for details.

**Parameters:** none

**Returns:**

```json
{
  "status": "clean",
  "counts": {
    "contexts": 4, "actors": 6, "policies": 7,
    "operations": 7, "processes": 5, "infoPoints": 27,
    "integrationPoints": 6
  },
  "lint": { "errors": 0, "warnings": 18, "info": 32 },
  "actors": [
    {
      "id": "librarian", "type": "human", "label": "Librarian",
      "decisions": [
        { "id": "lending-policy", "type": "policy" },
        { "id": "return-policy", "type": "policy" }
      ]
    }
  ],
  "contexts": [
    {
      "id": "lms", "type": "software",
      "description": "Library Management System",
      "decisions": ["lend-operation", "return-operation", "late-fee-policy"]
    }
  ],
  "processes": [
    {
      "id": "lending",
      "description": "A member requests a book and it is lent to them",
      "startsWith": ["book.requested"],
      "endsWith": ["book.lent", "member.loan.limit.reached"],
      "decisions": ["lending-policy", "lend-operation"],
      "businessItems": [
        {
          "type": "user-story",
          "policyId": "lending-policy",
          "operationId": "lend-operation",
          "formula": "As a Librarian, I want to lend book so that members can borrow books"
        }
      ]
    }
  ],
  "integrationPoints": [
    { "from": "library-desk", "to": "lms", "via": "lend.book",
      "decisions": ["lending-policy", "lend-operation"] }
  ]
}
```

## get_lint_results

Returns all validation results grouped by scope. The agent should fix errors first — they gate downstream pipeline stages.

**Parameters:** none

**Returns:**

```json
{
  "status": "clean",
  "validation": [],
  "spec": [
    { "ruleId": "spec/operation-has-constraints", "level": "info",
      "target": "late-fee-operation", "message": "has no constraints" }
  ],
  "system": [],
  "graph": [
    { "ruleId": "graph/info-point-has-producer", "level": "warning",
      "target": "book.exists", "message": "read but no operation produces it" }
  ],
  "summary": { "errors": 0, "warnings": 5, "info": 11 }
}
```

## get_business_view

Returns user stories (human actor) and automations (LLM/machine actor) with formulas and summary counts. Optionally filter by process.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `process` | string (optional) | Filter by process ID. Omit for all. |

**Returns:**

```json
[
  {
    "type": "user-story",
    "policyId": "lending-policy",
    "operationId": "lend-operation",
    "formula": "As a Librarian, I want to lend book so that members can borrow books",
    "actorId": "librarian",
    "actorType": "human",
    "context": "library-desk",
    "processes": ["lending"],
    "preconditionCount": 2,
    "constraintCount": 3,
    "outcomeCount": 2,
    "decisionTableRows": 7
  }
]
```

## get_user_story

Returns a single user story or automation by policy ID with full details.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `policyId` | string | The policy ID |

**Returns:** Full business view item with:
- **Acceptance criteria**: Given (preconditions), When (intent), Then (outcomes with effects), Should Fail If (constraints)
- **Decision table**: All paths — success, failure, skipped — with precondition/constraint/condition columns
- **View**: Info points the decision needs

## get_graph_insights

Returns graph analysis results — architectural insights derived from the decision topology. Only available when the graph has no errors.

**Parameters:** none

**Returns:** Analysis results grouped by category:
- **Boundaries**: context cohesion ratios, isolated contexts
- **Impact**: bottleneck detection (betweenness centrality), blast radius (reachability)
- **Clustering**: info point clusters (aggregate suggestions), decision clusters (boundary alignment)
- **Flow**: critical paths, dependency depth, temporal ordering (implementation order)
