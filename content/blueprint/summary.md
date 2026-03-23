---
title: "Summary"
description: "Overview of the Ubi. Blueprint — a fundamental model for complex information processing systems"
weight: 0
toc: false
---

The Blueprint presents a fundamental model for understanding complex information processing systems, grounded in Herbert Simon's bounded rationality and decision theory, Alberto Brandolini's EventStorming methodology, and Scott Wlaschin's functional domain modelling.

## Core Ideas

**The General Decision Model.** Every complex system — whether a software platform, an organisation, or a regulatory body — can be understood as a network of bounded decisions. Each decision is constrained by its information context, its procedure, its available choices, the actor's cognitive limits, and its agency.

**Decision Systems.** Decisions compose through dependency (recursion within procedures) and reactivity (one decision's output triggers another). These compositions give rise to emergent graph structures — dependency graphs and reactivity graphs — that represent the system's aggregate behaviour.

**The Canonical Decision System.** The cDS is a prescriptive canonical form — the minimal constraint structure that guarantees local verifiability of each decision's output and enables global validation and exploration of the system's behaviour. Decisions are closed-choice and programmed. Verification is deterministic and actor-independent.

**Verifiability by Construction.** The cDS does not claim global correctness of a running system. It guarantees that each individual decision can always be verified against its constraints (local), and that the decision graph can be validated for structural soundness and explored for system-wide behavioural patterns (global).

**Two Faces of Specification.** The cDS manifests as structural/semantic specifications (YAML, for system design and validation) and typed specifications (TypeScript, for implementation and verification), bridged by generated examples.

## Status

This section is under active development. The theoretical framework exists in substantially complete form but is being progressively committed to writing, refined, and grounded with formal references. Chapters are being published as they reach sufficient maturity. The published content represents the current state of the work — not a finished product.

The ideas presented here are the foundation for the [SDLC](/ubi-framework/sdlc/summary/) section and the [Toolkit](/ubi-framework/toolkit/).
