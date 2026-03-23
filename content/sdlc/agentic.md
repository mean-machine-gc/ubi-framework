---
title: "Machinery Implementation"
description: "Building and delivering the machine actors in a canonical socio-technical system"
weight: 3
toc: true
---

*This section is under development.*

Machinery implementation is the second activity of SDLC: building the deterministic machines and LLM-agents that participate as actors in the designed socio-technical system.

## What Gets Implemented

In a canonical socio-technical system, the machine actors are:

- **Outcome Decision evaluators** — code that receives an intent, evaluates constraints, checks conditions, and produces outcomes. This is the core business logic.
- **View Decision computers** — code that observes outcomes and computes derived views for human actors.
- **Automations** — code that observes outcomes and produces intents according to predefined reactive policies.
- **LLM-agent integrations** — where AI-agents participate in intent decisions or bare instructions, the integration layer that connects them to the decision system with appropriate constraints.

## Spec-Driven Implementation

The decision graph from system design defines *what* each machine actor must do. Implementation is the process of building code that satisfies those specifications.

The implementation workflow:

1. **Model** — design the domain types that represent the information units in the decision graph
2. **Specify** — translate the decision constraints and outcomes into typed behavioural specs
3. **Generate examples** — produce the verification examples that exercise all paths
4. **Implement** — write code until all examples pass
5. **Document** — generate documentation from the specs

Each step narrows freedom: the decision graph constrains the specs, the specs constrain the implementation, the examples verify the constraints hold. The machinery is verifiable by construction — not because the developer is trusted, but because the constraint chain is complete.

## The Role of AI-Agents in Implementation

LLM-agents can participate in machinery implementation as delegated actors — generating code, suggesting implementations, producing test scaffolding. The verifiability guarantee makes this safe:

- The agent generates code (stochastic, non-deterministic)
- The specs verify the code (deterministic, always terminates)
- If verification fails, the agent receives structured feedback (which constraints failed, which examples didn't pass)
- The loop repeats until verification passes

The agent doesn't need to be correct on the first attempt. It needs to be working within a constraint structure that catches errors. This is what "guardrails for vibe coding" means in practice.

## From Design to Delivery

The full SDLC path:

1. **Herbrand** produces the decision graph (system design)
2. **Phenomena** generates verification examples from the decision graph
3. **VibeRail** governs implementation of the machinery against the specs and examples
4. The implemented machinery is deployed — outcome decisions evaluate, views compute, automations react
5. The running system *is* the canonical socio-technical system that was designed

The delivered software is not an approximation of the design. It is the machinery layer of a formally specified, deterministically verifiable decision system.
