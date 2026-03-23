---
title: "Canonical Socio-Technical Systems"
description: "Projecting the cDS onto systems of humans, machines, and AI-agents"
weight: 6
toc: true
---

*This section is a working draft.*

## From Abstract to Socio-Technical

The Canonical Decision System is an abstract form — it guarantees deterministic verifiability without specifying who or what makes decisions. It defines constraint structures, not actors.

A **Canonical Socio-Technical System** is a cDS where the actor types are fixed to the three kinds of agents that participate in real-world information processing:

| Actor Type | Agency | Generation Characteristics |
|---|---|---|
| Human | Bounded rationality | Rational but cognitively limited, non-deterministic, context-sensitive |
| Deterministic Machine | Deterministic computation | Always terminates, always produces the same output for the same input |
| LLM-agent | Stochastic rationality | May produce different outputs for the same input, probabilistic, generative |

The cDS guarantees that all three can participate in the same decision system because verifiability depends on the constraints, not the actor. The socio-technical projection adds a further structure: **canonical assignments** — rules about which actor types can make which kinds of decisions.

## Canonical Assignments

Not every actor type is suitable for every decision type. The canonical assignments define the default allocation:

### Intent Decisions

Intent Decisions — whose choices represent the intent of something happening in the system — can be assigned to either Humans or Deterministic Machines.

- When assigned to **Humans**, the human decides what needs to happen based on their assessment of the situation. The decision is bounded by preconditions and the closed choice space, making the output verifiable even though the human's reasoning process is not.
- When assigned to **Deterministic Machines**, the intent becomes an **Automation** (or Programmed Reactive Policy) — a machine that autonomously initiates action in response to specific outcomes, following predefined rules.

### Outcome Decisions

Outcome Decisions — whose choices represent what has happened as a result of an intent — are assigned exclusively to **Deterministic Machines**. This is the canonical separation of concerns: humans decide *what should happen*, machines evaluate *what did happen* according to predefined rules.

### View Decisions

View Decisions — which elaborate or combine existing information into a different format — are assigned exclusively to **Deterministic Machines**. They are reactive, activated by outcomes.

### Bare Instructions

For Bare Instructions (the nested procedural steps within a decision's operative procedure), assignment cascades from the root decision. If a human makes an Intent Decision, the Bare Instructions within that decision's procedure are also assigned to the human. If a machine evaluates an Outcome Decision, the nested instructions are the machine's.

### LLM-Agent Assignments

LLM-agents introduce a new possibility: they can participate in Intent Decisions (assisted or autonomous), in Bare Instructions (as delegated implementers), and in View Decisions (as generators). The canonical assignments for LLM-agents are not yet fixed — they are an area of active exploration.

What *is* fixed: regardless of whether an LLM-agent makes the decision, the verifiability guarantee holds. The constraints check the output, not the actor.

## The Separation of Concerns

The canonical assignments encode a fundamental separation:

- **Humans** (and sometimes LLM-agents) decide **what** — they produce intents
- **Deterministic Machines** decide **what happened** — they evaluate intents against rules and produce outcomes
- **The cDS constraints** decide **whether it's valid** — they verify every output

This separation is not arbitrary. It emerges from the nature of the actors:

- Humans are good at contextual judgement but unreliable at rule evaluation
- Machines are perfect at rule evaluation but cannot exercise judgement
- LLM-agents can approximate both but guarantee neither

The canonical socio-technical system places each actor where their strengths matter and where their weaknesses are caught by verification.

## Why This Layer Exists

The pure cDS could model any system — biological, mechanical, organisational. The socio-technical projection exists because the framework's practical applications all involve humans, machines, and increasingly AI-agents working together. Fixing the actor types and defining canonical assignments provides a concrete starting point for domain-specific projections like SDLC.

The next step is to project this further: given a canonical socio-technical system, what does it look like when the domain is software delivery?
