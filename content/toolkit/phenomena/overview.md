---
title: "Overview"
weight: 1
toc: true
---

Phenomena is an example repository and management tool that bridges business specifications and executable specifications. It sits between Herbrand and VibeRail in the toolkit pipeline — taking the structured business specifications that Herbrand produces and generating the concrete examples needed to make them executable in VibeRail.

Named after the observable manifestations of underlying structures — because examples are precisely that: concrete observations that verify an abstract behavioural schema.

## How It Relates to the Framework

In the Canonical Decision System, every decision has a canonical operative procedure with preconditions, constraints, and branching conditions. Phenomena makes these conditions concrete by generating the examples that exercise them — the observable phenomena that demonstrate whether the invisible behavioural schema holds.

| Blueprint Concept | Phenomena Implementation |
|---|---|
| Information units | Examples, scenarios, test data |
| Transformation functions | Example generation, coverage analysis |
| Processing stages | Business spec → Example set → Executable spec |
| Invariants | Exhaustiveness, precision, traceability |
| Feedback loops | Coverage gaps feed back to specification refinement |

## Pipeline Position

Phenomena occupies a specific position in the toolkit pipeline:

1. **Herbrand** produces structured business specifications
2. **Phenomena** generates and manages the examples needed to make those specifications testable
3. **VibeRail** consumes the examples as executable specifications for implementation

VibeRail retains the capacity to generate its own examples, but Phenomena provides dedicated management for teams that need exhaustive, curated example sets — particularly for complex business logic where example coverage is critical.
