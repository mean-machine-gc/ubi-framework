---
title: "Workbench"
weight: 5
toc: true
---

The Herbrand UI is a React-based visual workbench that provides three complementary views of your business analysis. It launches automatically when the MCP server starts, or can be started manually.

## Views

### Specs View

Three-column layout for inspecting individual decision specs:

- **Left sidebar** — filterable spec list with context/module/aggregate filter chips, colour-coded dots (orange for outcome decisions, blue for intent decisions)
- **Centre panel** — detailed spec metadata: triggers, preconditions, choices, assertions
- **Right panel** — lint results and validation messages grouped by spec

### Decision Graph

Interactive graph visualization built with React Flow:

- **Swimlane layout** — views lane at top, human role lanes in the middle, automations lane at bottom
- **Colour-coded nodes** — intent decisions (blue), outcome decisions (orange), rejections (red), views (green)
- **Edge types** — intent flow, outcome flow, reject flow, view-to-intent, information flow
- **Side panel** — behaviour lint results grouped by rule, with warning count badge
- **Controls** — zoom, fit view, pan

The graph is the central artifact — it shows the reactive loops, the decision chains, and the structural relationships that are invisible when reading specs individually.

### Business View

User story cards in "As a [role], I want to [intent] so to [goal]" format, each with four tabs:

- **Acceptance Criteria** — Given/When/Then format covering triggers, preconditions, outcomes, assertions, and failure cases
- **Decision Table** — tabular view with scenario descriptions, precondition pass/fail columns, constraints, outcomes, assertions, effects
- **Scenarios** — grouped by type: success, failure, skipped
- **Views** — role-based information requirements

All derived from the decision graph — not manually authored. When specs change, the business view updates automatically.
