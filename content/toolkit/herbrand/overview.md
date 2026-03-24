---
title: "Overview"
weight: 1
toc: true
---

Herbrand is a decision-first business analysis framework that models systems as chains of decisions. It bridges Herbert Simon's decision theory with CQRS/Event Sourcing architecture patterns, giving business analysts and software architects a shared language.

The name combines its two primary influences: **Herbert Simon** (bounded rationality, decision theory) and **Alberto Brandolini** (EventStorming, collaborative domain modelling). It also coincides with Jacques Herbrand — the mathematician whose work on decidability lays the foundation for formal verification.

## The Core Insight

Every business system is a reactive loop of decisions:

```
Outcomes → Policies → Intents → Operations → Outcomes → ...
```

**Policies** listen to outcomes, evaluate preconditions against available information, and decide *what should happen* by emitting an intent. If preconditions aren't met, they silently drop — no error, no noise.

**Operations** listen to intents, evaluate success constraints, and determine *what has happened* by producing outcomes. If any constraint fails, the operation produces an explicit failure outcome listing the violations.

This maps directly to CQRS: intents are commands, outcomes are events. But the language comes from behavioural science, not software engineering — making it accessible to business analysts and domain experts.

## What Herbrand Does

You describe your domain as decisions. Herbrand derives everything else:

- **Info points** — discovered from what decisions need to read and write. The data model is an output, not an input.
- **Views** — projections of info points that each decision needs. For human actors, these are UI requirements. For AI agents, these are prompt context. For machines, these are queries.
- **Integration points** — where reactive chains cross execution context boundaries.
- **User stories and automations** — derived from policy→operation pairs with full acceptance criteria, decision tables, and scenarios.
- **Graph analysis** — bottleneck detection, boundary alignment, clustering, critical paths — powered by graph algorithms.

## The Ecosystem

```
@herbrand/core     — types, schemas, graph, linting, analysis, store
herbrand-mcp       — MCP server with tools and skills for AI-assisted BA
herbrand-ui        — React workbench with live YAML file watching
```

### @herbrand/core

The foundation. Contains:
- **Zod schemas** as the single source of truth for all authored types (Policy, Operation, Actor, ExecutionContext, ProcessDefinition)
- **Decision graph** derivation with signal nodes, view nodes, and side-effect tracking
- **Three lint scopes**: spec-level (13 rules, single decision), system-level (5 rules, graph-blocking), graph-level (18 rules, topology analysis)
- **14 graph analyses** via graphology: community detection, betweenness centrality, clustering, critical paths, temporal ordering
- **Business view** derivation: user stories for human actors, automation rules for AI/machine actors
- **Reactive store** (preact/signals-core) that chains the full pipeline: files → validation → system → lint → graph → analysis → business view
- **JSON Schema generation** for VS Code YAML validation

### herbrand-mcp

An MCP server that gives AI agents structured access to Herbrand's computed artifacts:
- **7 tools**: install_skills, launch_ui, get_system_overview, get_lint_results, get_business_view, get_user_story, get_graph_insights
- **5 skills**: primer, explore-process, review-system, challenge-model, enrich

### herbrand-ui

A React workbench with four views:
- **Specification** — three-column layout: actors/contexts/decisions (left), decision cards (center), info universe (right). Process filtering across all columns.
- **Graph** — interactive decision graph with actor×context swimlanes, stacked outcomes, side-effect toggle, and a graph analysis panel.
- **Business** — user story and automation cards with tabbed acceptance criteria, decision tables, scenarios, and view requirements.
- **Document** — rendered Markdown documentation with system overview and per-process narratives.

## The Data Transformation Pipeline

```
YAML files
  → Zod validation (schema errors)
  → Build system (enrich with derived artifacts)
  → Spec lint (per-decision, 13 rules)
  → System lint (cross-decision, 5 rules — gates graph building)
  → Derive decision graph (nodes: signals, policies, operations, views)
  → Graph lint (topology, 18 rules — gates analysis)
  → Graph analysis (14 analyses: boundaries, impact, clustering, flow)
  → Business view (user stories, automations, decision tables)
  → Document enrichment (prose Markdown via LLM)
```

Each stage gates the next. Spec errors block system building. System errors block graph derivation. Graph errors block analysis. This ensures the agent fixes problems in order of severity.

## Key Concepts

### Execution Contexts

Where decisions happen — the "system" in EventStorming terms:
- **Software contexts** (internal or external) — host automated and agentic decisions
- **Institutional contexts** (role-authority, ceremony, department, committee) — host human decisions

### Actors

Who executes each decision:
- **Human** actors (with roles) — evaluate with judgment
- **LLM** actors — evaluate with AI assistance
- **Machine** actors — evaluate deterministically

Context-actor compatibility: institutional contexts require human actors, software contexts require LLM or machine actors.

### Processes

Named narratives through the decision graph — perspectives, not structural boundaries. "The lending process" is the story from book request to book lent. A decision can participate in multiple processes. Processes guide the analyst's conversation: "let's walk through what happens when..."

### Info Points

Atomic pieces of information that decisions need. Not declared upfront — discovered from what preconditions read, what constraints check, and what outcomes modify. The data model emerges from the decisions.
