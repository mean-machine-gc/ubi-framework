---
title: "System Design"
description: "Designing canonical socio-technical systems for software delivery"
weight: 2
toc: true
---

*This section is under development.*

System design is the first activity of SDLC: defining the canonical socio-technical system that the software will implement.

## What Gets Designed

A canonical socio-technical system for software delivery consists of:

- **Intent Decisions** — what should happen, decided by humans (or automations)
- **Outcome Decisions** — what did happen, evaluated by deterministic machines
- **View Decisions** — how information is presented, computed by machines
- **Streams** — the intent and outcome ledgers that connect decisions reactively
- **Boundaries** — aggregates (transactional), modules (consistency), contexts (semantic)
- **Information units** — the named data that flows between decisions

## The Design Process

System design proceeds through iterative discovery and formalisation:

1. **Listen** — conversations with stakeholders reveal decisions ("when this happens, we need to...", "the system checks whether...", "if that fails, then...")
2. **Formalise** — each discovered decision is specified as a YAML spec with its trigger, preconditions or constraints, and outcomes
3. **Validate** — the specification is checked for completeness (spec-level linting) and the emerging system is checked for structural consistency (behaviour-level linting)
4. **Review** — the decision graph is translated back to stakeholder language as user stories, acceptance criteria, and decision tables
5. **Challenge** — the model is stress-tested for missing failure modes, dead ends, orphan outcomes, and structural gaps

This cycle is continuous. The decision graph is never "done" — it evolves as understanding deepens.

## Design Outputs

The primary output of system design is the **decision graph** — but from this graph, several derived outputs are generated:

- **User stories** — "As a [role], I want to [intent] so to [goal]"
- **Acceptance criteria** — Given/When/Then derived from triggers, preconditions, and outcomes
- **Decision tables** — tabular view of all scenarios, conditions, and outcomes
- **Scenarios** — concrete examples of success, failure, and skip paths
- **View requirements** — what information each role needs to see

These are not manually authored documents that drift from the system. They are computed from the decision graph and update automatically when specs change.
