---
title: "MCP Tools"
weight: 4
toc: true
---

The Herbrand MCP server exposes three tools that give AI agents read access to the analysis pipeline. The agent writes YAML specs directly; the tools let it inspect the results.

## get_pipeline_results

Returns the current state of the analysis pipeline: spec count, spec-level lint results (grouped by spec name), whether there are blocking errors, and behaviour-level lint results.

This is the agent's primary orientation tool — call it first to understand where the project stands.

**Parameters:** none

**Returns:**

```json
{
  "specCount": 12,
  "specLint": [
    { "spec": "fulfil-order", "errors": [], "warnings": ["missing scenario"] }
  ],
  "hasSpecErrors": false,
  "behaviorLint": [
    { "rule": "orphan_outcome", "message": "..." }
  ]
}
```

## get_user_stories

Returns a summary list of all user stories derived from the decision graph.

**Parameters:** none

**Returns:**

```json
[
  {
    "name": "fulfil-order",
    "role": "product_owner",
    "intentLabel": "fulfil order",
    "businessGoal": "initiate the fulfilment process",
    "hasLinkedOutcome": true
  }
]
```

## get_user_story

Returns a single user story in full detail: acceptance criteria (Given/When/Then), decision table, scenarios, and view requirements.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `name` | string | The user story name |

**Returns:** Full user story object with acceptance criteria, decision table rows, success and failure scenarios, and associated view requirements.
