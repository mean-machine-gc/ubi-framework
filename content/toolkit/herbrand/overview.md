---
title: "Overview"
weight: 1
toc: true
---

Herbrand is a decision-first business analysis framework that models organisational processes as chains of bounded decisions. It reconciles business analysis with CQRS and Event Sourcing patterns, grounding both in the same decision model.

The fundamental insight: every business system is two loops — Outcomes trigger Intent Decisions that produce Intents, which trigger Outcome Decisions that produce Outcomes. This is the reactive engine that drives all business behaviour.

The name combines its two primary influences: **Herbert Simon** (bounded rationality, decision theory) and **Alberto Brandolini** (EventStorming, collaborative modelling). Accidentallly it coincides with Jacques Herbrand — the mathematician whose work on decidability lays the foundation for the field of formal verification, i.e. compliance of systems behaviour to their specifications.

## How It Works

You just talk. Describe your domain naturally — "the customer picks products, adds them to the cart, then checks out." Behind the scenes, two agents coordinate through a shared scratchpad:

```
You ←→ Conversation Agent ←→ Scratchpad ←→ Spec Agent ←→ .hb.yaml specs
         (talks to you)        (shared)      (background)    (validated)
```

1. **You talk**, the Conversation Agent writes observations to the scratchpad
2. **When enough detail exists** (who decides, what triggers it, what can fail, what it produces), the entry gets marked ready
3. **The Spec Agent picks up** ready entries, writes the YAML specs, validates them with Herbrand, and marks them formalized
4. **When you want to see** what's been captured, the Conversation Agent reads the generated user stories and presents them back in plain language

No manual actions are needed for the basic flow. You just talk. The agents coordinate automatically. Optional slash commands let you review, challenge, discover, or refine on demand.

### What you'll never see

- YAML files, spec syntax, or framework terminology
- Validation errors or pipeline results (the Spec Agent handles those silently)
- Info units, preconditions, assertions, triggers — the agents use these internally but speak to you in domain language

### When the Spec Agent gets stuck

If a scratchpad entry is too vague to formalize, the Spec Agent marks it `needs-clarification` and writes a question back to the scratchpad. Next time you interact, the Conversation Agent picks up that question and weaves it naturally into the conversation. You answer in plain language, the entry gets updated, and the Spec Agent formalizes it on the next run.

## The Ecosystem

The monorepo contains:

- **@herbrand/core** — parsing, validation, graph construction, linting, user story extraction
- **@herbrand/signals** — reactive state management, file watching, cascading recomputation
- **herbrand-mcp** — MCP server with 3 tools, interactive skills, and a two-agent architecture (Conversation Agent + Spec Agent) for AI-assisted business analysis
- **herbrand-ui** — React workbench with specs view, decision graph visualization, and business output view

## Two Levels of Validation

Herbrand validates at two distinct levels:

**Spec-level linting** — 15 rules checking individual spec quality: missing triggers, missing choices, no rejection paths, missing descriptions, missing roles on intent decisions, missing business goals, missing scenarios.

**Behaviour-level linting** — system-wide graph analysis: orphan outcomes, dead-end outcomes, unconsumed intents, unhandled rejections, information never written, information never read, competing outcome decisions, duplicate intent decisions, aggregate boundary hints.

This two-level approach catches both local errors (a spec is incomplete) and systemic errors (the system as a whole has structural problems).
