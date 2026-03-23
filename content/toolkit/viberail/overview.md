---
title: "Overview"
weight: 1
toc: true
---

VibeRail is a TypeScript framework where function behaviour is described as structured, typed data objects called specs. Tests, documentation, and dependency graphs derive automatically from these specifications.

The name captures two ideas:

- **Guardrail for vibe coding** — moves away from drifting markdown specifications in favour of typed specs that are code. They can't go stale because they're compiled and tested.
- **Railway programming** — inspired by Scott Wlaschin's railway oriented programming (*Domain Modeling Made Functional*, Pragmatic Bookshelf, 2018). Enforces a standard Result return type across all functions, simplifies composition with standardised dependency injection and curried step inputs, and provides a strategy record pattern that removes conditional logic from pipes, keeping them linear. Unlike pure functional railway programming, VibeRail keeps an imperative style — developers read pipes top to bottom as sequential steps, not as composed functions. This gives access to the structural benefits of the railway pattern (uniform contracts, explicit error paths, composable pipelines) without requiring knowledge of functional programming abstractions like monads or bind chains.

The ecosystem consists of three packages:

- **viberail** — the core library: type system, test generation, CLI, execution engine
- **viberail-mcp** — MCP server exposing VibeRail's capabilities to AI agents, with six interactive skills that guide developers through the spec-first workflow
- **viberail-ui** — a browser-based visual workbench for exploring specs, dependency graphs, decision tables, and test results

## Core Concepts

### Specs as Data

Every function starts as a behavioural contract — a `Spec<Fn>` object with three sections:

- **`shouldFailWith`** — failure modes with example inputs
- **`shouldSucceedWith`** — success paths with example inputs and expected outputs
- **`shouldAssert`** — assertion functions that must hold on success

### The Result Type

All functions return `{ ok: true, value: T, successType: S[] }` or `{ ok: false, errors: F[], details?: string[] }`. No exceptions thrown — every outcome is typed and traceable.

### The Four Laws

1. Specs precede implementation
2. Specs are authoritative — the spec is the source of truth, not the code
3. Use Result, not exceptions
4. All functions need specs with realistic examples

### The Five-Step Workflow

1. **Model** — design domain types
2. **Spec** — write behavioural contracts
3. **Test** — auto-generate tests from specs
4. **Implement** — write code until tests pass
5. **Docs** — generate documentation from specs

## How It Relates to the Blueprint

In the Canonical Decision System, every decision is programmed and closed-choice with a canonical operative procedure. VibeRail makes this structure executable:

| Blueprint Concept | VibeRail Implementation |
|---|---|
| Information units | Specs, types, Result values |
| Transformation functions | SpecFn with typed input/output |
| Processing stages | Model → Spec → Test → Implement → Docs |
| Invariants | Spec assertions, failure unions, type contracts |
| Decision stages | Constraints (validate), conditions (branch), transform (produce) |
| Feedback loops | Test failures feed back to implementation with spec context |
