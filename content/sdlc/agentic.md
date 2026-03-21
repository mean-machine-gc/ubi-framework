---
title: "Agentic Model"
description: "The impact of LLM-agents on the SDLC decision system"
weight: 3
toc: true
---

*This section is under development.*

The agentic SDLC model relaxes the non-agentic constraint by introducing LLM-agents as a third Actor type with stochastic rationality. This section explores what changes when LLM-agents participate in the SDLC decision system — which decisions they can take, what constraints shift, and what new verification requirements emerge.

## Where Agents Enter

LLM-agents can participate in the SDLC decision system at multiple points:

| SDLC Function | Agent Role | Decision Type |
|---|---|---|
| Business Analysis | Specification generation, context synthesis | Intent Decisions (assisted) |
| Architecture | Alternative evaluation, pattern suggestion | Intent Decisions (assisted) |
| Development | Code generation, implementation | Bare Instructions (delegated) |
| QA | Test generation, defect detection | View Decisions (autonomous) |

## Stochastic Rationality

The key difference between a Deterministic Machine and an LLM-agent is the nature of their Agency. A Deterministic Machine always produces the same output for the same input — its Procedure is fixed. An LLM-agent's Procedure is stochastic — the same input may produce different outputs across invocations.

This has structural consequences for the cDS: invariants that hold under deterministic execution may not hold under stochastic execution. The canonical operative procedures remain the same, but the *confidence* in their outcomes changes.

## Verification as First-Class Concern

In the non-agentic model, verification is a quality assurance function. In the agentic model, verification becomes a structural requirement at every point where an LLM-agent makes a decision. This is the theoretical foundation for specification-driven development — the specification is the constraint set that governs the agent's decision, and verification is the mechanism that ensures the constraint set holds.

This is precisely what the UBI Toolkit implements: Herbrand constrains the agent's business analysis decisions; VibeRail constrains the agent's development decisions; both require verification at each stage.
