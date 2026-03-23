---
title: "Overview"
weight: 1
toc: true
---

Herbrand is a decision-first business analysis framework that models organisational processes as chains of bounded decisions. It reconciles business analysis with CQRS and Event Sourcing patterns, grounding both in the same decision model.

The fundamental insight: every business system is two loops — Outcomes trigger Intent Decisions that produce Intents, which trigger Outcome Decisions that produce Outcomes. This is the reactive engine that drives all business behaviour.

The name combines its two primary influences: **Herb**ert Simon (bounded rationality, decision theory) and Alberto Br**and**olini (EventStorming, collaborative modelling). Accidentallly it coincides with Jacques Herbrand — the mathematician whose work on decidability lays the foundation for the field of formal verification, i.e. compliance of systems behaviour to their specifications.

## How It Works

Business analysts and AI agents work in a collaborative loop:

1. **Conversations** reveal decisions — a Business Analyst can have a conversation about with the agent on something he/she is working on; it might be a live relay of a conversation with a domain expert or client, or a subsequent relay to explore the findings and produces structured artifacts.
2. **The agent writes YAML specs** — plain, readable, no code. Each spec describes a single decision: its trigger, its preconditions or constraints, its outcomes
3. **Herbrand processes the specs** — parses, validates, builds a decision graph, lints for inconsistencies at both the spec level and the system level
4. **Business outputs are extracted** — user stories, acceptance criteria, decision tables, scenarios — all derived from the graph, not written by hand
5. **Feedback loops** — lint results and generated outputs reveal gaps, contradictions, and missing paths. The cycle repeats

The human never touches the graph or the code. They reason about business. The agent writes YAML. Herbrand does the heavy lifting.

## The Ecosystem

The monorepo contains:

- **@herbrand/core** — parsing, validation, graph construction, linting, user story extraction
- **@herbrand/signals** — reactive state management, file watching, cascading recomputation
- **herbrand-mcp** — MCP server with 3 tools and 6 skills for AI-assisted business analysis
- **herbrand-ui** — React workbench with specs view, decision graph visualization, and business output view

## Two Levels of Validation

Herbrand validates at two distinct levels:

**Spec-level linting** — 15 rules checking individual spec quality: missing triggers, missing choices, no rejection paths, missing descriptions, missing roles on intent decisions, missing business goals, missing scenarios.

**Behaviour-level linting** — system-wide graph analysis: orphan outcomes, dead-end outcomes, unconsumed intents, unhandled rejections, information never written, information never read, competing outcome decisions, duplicate intent decisions, aggregate boundary hints.

This two-level approach catches both local errors (a spec is incomplete) and systemic errors (the system as a whole has structural problems).
