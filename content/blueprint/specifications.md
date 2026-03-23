---
title: "Two Faces of Specification"
description: "Structural specifications for validation, typed specifications for verification"
weight: 7
toc: true
draft: true
---

*This section is a working draft.*

## The cDS Expressed Twice

The Canonical Decision System is a single model, but it manifests as two distinct kinds of specification — each serving a different purpose, each checked differently, each expressed in a format suited to its audience.

### Structural and Semantic Specifications

The first face describes *what* the decision system is:

- What decisions exist
- What triggers each decision
- What outcomes are possible (the closed choice space)
- What constraints govern each decision
- What information flows between decisions
- How decisions connect reactively
- What boundaries organise the system

These specifications are **structural** (the topology of the decision graph) and **semantic** (the meaning of each decision — its business goal, its preconditions, its role assignments). They are expressed in **YAML** — a plain, readable format accessible to business analysts, domain experts, and AI agents without requiring programming knowledge.

Checking these specifications is **validation**: is the system structurally sound? Are the specs complete? Are there orphan outcomes, dead ends, missing constraints, competing decisions? Validation operates on the model itself, not on any implementation.

### Typed Specifications

The second face describes *how* each machine actor behaves:

- What types go in (input)
- What types come out (output)
- What failure modes exist (failure types)
- What success paths exist (success types)
- What assertions must hold (post-conditions)

These specifications are **typed** — they define behavioural contracts with full type safety. They are expressed in **TypeScript** — the language of the machinery that will be implemented and verified.

Checking these specifications is **verification**: does the implemented code produce outputs that satisfy the contract? Does every example pass? Do all assertions hold? Verification operates on outputs, not on the model.

### The Bridge: Examples

Between the structural/semantic specifications and the typed specifications sit **examples** — concrete scenarios that exercise every path through the decision. Examples are derived from the structural specs (which define all the paths) and consumed by the typed specs (which use them as test cases).

Examples bridge validation and verification. They translate "this decision has these possible outcomes under these conditions" (structural) into "given this input, expect this output" (typed).

## The Specification Table

| Spec Type | Format | Audience | Purpose | Check | Tool |
|---|---|---|---|---|---|
| Structural / Semantic | YAML | Business analysts, domain experts, AI agents | Define the decision system | Validation | Herbrand |
| Examples | Generated | Bridges both audiences | Translate paths to test cases | — | Phenomena |
| Typed | TypeScript | Developers, AI agents | Define machine behaviour contracts | Verification | VibeRail |

## One Model, Two Expressions

These are not two separate models that must be kept in sync. They are two expressions of the same Canonical Decision System:

- The YAML specs express the cDS as a **system design** — the decisions, their constraints, their connections
- The TypeScript specs express the cDS as **implementation contracts** — the machine behaviours that realise those decisions

Both reference the same canonical concepts: closed choice spaces, programmed procedures, defined information contexts, canonical operative procedures. The vocabulary changes (a "shouldFailWith" in VibeRail is a "shouldFailWith" in Herbrand). The structure is identical.

This is why **UBI Core** exists as the foundational package — it provides the shared specification primitives that both Herbrand and VibeRail reference. The canonical model, in code, underlying both faces.

## Why Two Faces?

Because validation and verification serve different purposes and require different affordances:

- **Validation** needs to be accessible to non-technical stakeholders. YAML is readable by anyone. The decision graph is navigable visually. User stories, acceptance criteria, and decision tables are generated in plain language. The business analyst doesn't need to know TypeScript to validate the system design.

- **Verification** needs to be precise and executable. TypeScript provides type safety, compiler checks, and runtime assertions. The developer doesn't need to know the full decision graph to verify that their function satisfies its contract.

The two faces meet at the boundary between system design and machinery implementation — which is exactly where the SDLC pivot occurs, and where Phenomena generates the examples that connect them.
