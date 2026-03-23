---
title: "MCP Tools"
weight: 4
toc: true
---

The VibeRail MCP server exposes ten tools for AI agents to interact with the spec-first workflow. Install via `npx -y viberail-mcp`.

## Project Management

### init-project

Initializes a project with VibeRail. Installs dependencies, adds npm scripts (`vr:gen`, `vr:check`), scaffolds `docs/` directory, copies skills to `.claude/skills/`. Idempotent — safe to run multiple times.

| Parameter | Type | Description |
|---|---|---|
| `projectPath` | string | Path to the project directory |

### launch-ui

Starts the `viberail-ui` visual workbench and opens the browser. 15-second startup timeout.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `projectPath` | string | | Path to the project |
| `port` | number | 3700 | Server port |

## Spec Analysis

### list-specs

Discovers all specs with metadata: export name, file path, step count, failure codes, success types.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `projectPath` | string | | Path to the project |
| `specGlob` | string | `src/domain/**/*.spec.ts` | Glob pattern for spec files |

### get-spec

Returns a single spec's markdown representation as a decision table or pipeline table.

| Parameter | Type | Description |
|---|---|---|
| `projectPath` | string | Path to the project |
| `specPath` | string | Path to the spec file |

### check

Validates specs for completeness and correctness across six dimensions: example completeness, assertion strength, orphan detection, failure union drift, step-implementation sync, inheritance completeness. Returns errors and warnings as JSON.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `projectPath` | string | | Path to the project |
| `specGlob` | string | `src/domain/**/*.spec.ts` | Glob pattern |

### get-dependency-graph

Returns the spec dependency graph as a Mermaid flowchart with node and edge counts.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `projectPath` | string | | Path to the project |
| `specGlob` | string | `src/domain/**/*.spec.ts` | Glob pattern |

## Code Generation

### generate-test

Creates a `.test.ts` file with a `testSpec()` call for a given spec. Handles dependency injection templates automatically.

| Parameter | Type | Description |
|---|---|---|
| `projectPath` | string | Path to the project |
| `specPath` | string | Path to the spec file |

### gen

Regenerates all `.spec.md` documentation files and `docs/dependency-graph.md`. Returns the list of generated file paths.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `projectPath` | string | | Path to the project |
| `specGlob` | string | `src/domain/**/*.spec.ts` | Glob pattern |

### generate-docs

Generates a documentation page template with mechanical sections auto-populated and prose sections marked with HTML comment placeholders.

| Parameter | Type | Description |
|---|---|---|
| `projectPath` | string | Path to the project |
| `specPath` | string | Path to the spec file |
| `aggregate` | string | Aggregate name for organization |
| `navOrder` | number | Navigation ordering |

## Test Results

### get-test-results

Reads and returns the VibeRail JSON test report showing per-spec pass/fail/skip status.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `projectPath` | string | | Path to the project |
| `resultsFile` | string | `viberail-results.json` | Results file path |
