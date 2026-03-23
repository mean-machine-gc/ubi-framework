---
title: "SDLC as System Design and Delivery"
description: "Software delivery as the design of socio-technical systems and the implementation of their machinery"
weight: 1
toc: true
draft: true
---

*This section is under development.*

## The SDLC Reframed

The software delivery lifecycle is conventionally understood as a process: requirements → design → implementation → testing → deployment. The Ubi. framework offers a different reading:

**Software delivery is two things:**

1. **Designing a canonical socio-technical system** — defining what decisions exist, who makes them, how they connect, what constraints govern them, what information flows between them
2. **Implementing and delivering the machinery** — building the deterministic machines and LLM-agents that participate as actors in that system

Everything in SDLC is one of these two activities. Business analysis, domain modelling, architecture — these are *system design*. Development, testing, deployment — these are *machinery implementation and delivery*.

## System Design

Designing the socio-technical system means answering:

- What are the decisions in this system?
- What triggers each decision?
- What are the possible outcomes (closed choice space)?
- What constraints govern each decision?
- What information does each decision need?
- Who makes each decision — human, machine, or LLM-agent?
- How do decisions connect — what reactive chains exist?

The output of system design is a **decision graph** — the complete topology of the socio-technical system. This is what Herbrand produces: structured YAML specifications of intent and outcome decisions, validated and connected into a navigable graph.

System design is not a one-time phase. It is continuous — every conversation with a stakeholder, every discovered edge case, every new requirement refines the decision graph.

## Machinery Implementation

Once the socio-technical system is designed, the machine actors need to be built. In a canonical socio-technical system:

- **Outcome Decisions** are assigned to deterministic machines — these must be implemented as code that evaluates constraints, checks conditions, and produces outcomes
- **View Decisions** are assigned to deterministic machines — these must be implemented as code that computes and returns views
- **Automations** (machine-assigned Intent Decisions) must be implemented as reactive policies

This is what VibeRail does: it takes behavioural specifications and governs the implementation of the machinery that executes them. The specs define the constraints. The implementation is the machine. The tests verify that the machine satisfies the constraints.

## The Pipeline

The SDLC pipeline maps directly to the toolkit:

| SDLC Activity | What It Does | Tool |
|---|---|---|
| Domain discovery | Identify decisions, actors, streams | Herbrand |
| System design | Specify and validate the decision graph | Herbrand |
| Example generation | Produce verification examples from specs | Phenomena |
| Machinery implementation | Build and verify machine actors | VibeRail |
| Graph exploration | Analyse system topology and boundaries | Atlas |
| Interface prototyping | Prototype human-facing interactions | Protopal |

## Roles Reframed

Traditional SDLC roles map to activities within this framing:

- **Business Analyst** — designs the socio-technical system (decision discovery, specification, validation)
- **Software Architect** — designs the boundaries and topology of the decision graph (aggregates, modules, contexts, stream organisation)
- **Developer** — implements the machinery (outcome decisions, view decisions, automations as code)
- **QA Engineer** — verifies that the machinery satisfies the constraints (the verification examples, coverage analysis)
- **Product Owner** — the primary human actor in the designed system, making intent decisions

These are not separate disciplines working in sequence. They are different perspectives on the same decision graph, operating concurrently.
