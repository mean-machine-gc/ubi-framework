---
title: "Visual Workbench"
weight: 6
toc: true
---

The VibeRail UI is a browser-based dashboard for exploring, analysing, and debugging behavioural specs.

## Installation

```bash
npm install -g viberail-ui
# or run directly
npx viberail-ui --folder ./my-project
```

Or launch via MCP:

```bash
# Via the launch-ui MCP tool
launch-ui --projectPath ./my-project
```

Access at `http://localhost:3700`.

## Configuration

| Flag | Default | Description |
|---|---|---|
| `--folder <path>` | Current directory | Directory containing `.spec.ts` files |
| `--port <port>` | 3700 | Server port |

## Views

### Dependency Graph

Interactive network visualization using Cytoscape.js showing spec relationships — which functions depend on which, how steps compose, where strategies dispatch.

### Spec Browser

Searchable, domain-organized list of all specifications. Filter by aggregate, search by name, view metadata at a glance.

### Decision Table

Detailed decision matrices for individual specs — every failure mode, every success path, every example, laid out as a table.

### Pipelines

Visual representation of step sequences and connections for factory functions. Shows the flow from input through each step to output.

### Coverage Matrix

Test coverage across scenarios — which examples are tested, which assertions run, where gaps exist.

### Analysis

Statistical and health metrics across the spec base. Surfaces the same issues as `viberail check` but in a visual, navigable format.

### Test Results

Jest test execution dashboard — per-spec pass/fail/skip status, failure details, run history.

### Git Diff

Cross-branch and cross-commit specification comparison. See how specs have changed over time — which failures were added, which success paths modified, which assertions tightened.
