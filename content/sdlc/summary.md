---
title: "Summary"
description: "Overview of the Ubi. SDLC — software delivery as the design and implementation of socio-technical systems"
weight: 0
toc: false
---

The SDLC section applies the Ubi. Blueprint to software delivery, reframing the software delivery lifecycle as two activities:

1. **Designing a canonical socio-technical system** — defining what decisions exist, who makes them, how they connect, what constraints govern them
2. **Implementing and delivering the machinery** — building the deterministic machines and LLM-agents that participate as actors in that system

## Core Ideas

**System Design.** Business analysis, domain modelling, and architecture are all perspectives on the same activity: designing the decision graph that represents the socio-technical system. Conversations with stakeholders reveal decisions. Decisions are formalised as specifications. The emerging graph is validated for structural soundness. Business outputs — user stories, acceptance criteria, decision tables, scenarios — are derived from the graph, not manually authored.

**Machinery Implementation.** Development is the process of building the machine actors that participate in the designed system. Outcome decisions, view decisions, and automations are implemented as code, governed by typed behavioural specifications. Verification ensures the machinery satisfies its constraints.

**Roles as Perspectives.** Traditional SDLC roles — business analyst, architect, developer, QA engineer, product owner — are not separate disciplines working in sequence. They are different perspectives on the same decision graph, operating concurrently on a shared artefact.

**The Toolkit Pipeline.** The SDLC maps directly to the Ubi. toolkit: Herbrand for system design, Phenomena for example generation, VibeRail for machinery implementation and verification, Atlas for graph exploration, Protopal for interface prototyping.

## Status

This section is under active development. It depends on the theoretical foundations established in the [Blueprint](/ubi-framework/blueprint/summary/) and is being developed in parallel with the toolkit. Chapters are being published as they reach sufficient maturity.

The framing presented here — SDLC as the design of socio-technical systems and the implementation of their machinery — is a working hypothesis being validated through practical application of the toolkit on real projects.
