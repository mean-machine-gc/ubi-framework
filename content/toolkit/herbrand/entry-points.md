---
title: "Entry Points"
weight: 4
toc: true
---

Herbrand can be introduced at different stages of a project lifecycle. The right entry point is determined by what you have in hand — not by where you are in a formal process. Each entry point implies a different starting condition, a different role for the agent, and a different set of skills to lead with.

---

## After an EventStorming Session

**Starting condition:** a completed EventStorming board — sticky notes, domain events, commands, aggregates, hotspots, and the collaborative understanding produced in the room.

EventStorming produces rich domain insight but leaves it in an informal state: visual, narrative, and not yet verifiable. Herbrand picks up exactly here. The EventStorming board maps naturally onto Herbrand's primitives — domain events become outcomes, commands become intents, policies and read models find their counterparts directly — and the translation process is the formalisation step that EventStorming deliberately defers.

The agent leads the conversion, walking the board process by process. Hotspots and open questions from the session become candidates for constraint or precondition modelling. The lint pipeline surfaces gaps and ambiguities that the board left implicit.

**Lead with:** `/herbrand-primer` to set up the system, then `/herbrand-explore-process` for each process identified on the board.

---

## From Existing Documents and Notes

**Starting condition:** meeting notes, requirement documents, user story backlogs, BRD excerpts, email threads, or any existing written artefacts that describe business behaviour.

This is the most common entry point for projects with prior analysis work. The agent reads the available material and begins extracting decision structure: what triggers behaviour, what rules govern it, what outcomes are expected. Rules buried in prose become explicit constraints or preconditions. Implicit happy paths become unconditional outcomes. Edge cases buried in footnotes become conditional outcomes or constraint violations.

The process surfaces what the documents assumed rather than stated — missing rules, undefined states, contradictions between sections — and forces them into the open before implementation begins.

**Lead with:** `/herbrand-primer`, then share documents with the agent and open `/herbrand-explore-process` process by process.

---

## Live with a Domain Expert

**Starting condition:** a domain expert available for conversation, with little or no prior written artefacts.

The agent acts as a structured interviewer. It guides the expert through the decision landscape using the Herbrand primitives as a frame: what signals trigger a decision, who makes it, under what conditions does the intent make sense, what can go wrong, what does success look like, what else might be true when it happens. The expert speaks in business language; the agent translates in real time into YAML specs.

This entry point is particularly effective for tackling complex or contested domain areas where the rules live in people's heads rather than in documents. The live feedback loop — spec written, linted, reviewed — keeps the expert anchored to concrete, verifiable statements rather than abstract descriptions.

**Lead with:** `/herbrand-primer` to orient the expert on what the tool produces, then `/herbrand-explore-process` driven by the expert's narrative.

---

## Greenfield Discovery

**Starting condition:** a domain area to model, no prior artefacts. The analyst knows the problem space but has not yet begun elicitation or design.

The agent leads a structured discovery session from scratch. It asks the questions that prime domain understanding: what changes in the world trigger decisions, who is involved, what do they need to know, what can prevent them from acting, what does a successful outcome look like. System structure — contexts, actors, processes — emerges from the conversation before any decision specs are written.

This is the purest form of behaviour-first modelling. Nothing is assumed about the data model. Nothing is carried over from prior systems. The behavioural graph builds from zero, and every artefact — info points, views, integration points — is a consequence of the decisions, not a prerequisite for them.

**Lead with:** `/herbrand-primer` to co-discover the system structure, then `/herbrand-explore-process` for each process as it emerges.

---

## Delivery Team Refinement and Challenge

**Starting condition:** an existing Herbrand model — partially or fully specified — that the delivery team needs to understand, validate, or stress-test.

Once a model exists, the delivery team becomes the primary audience. Developers, testers, and architects use the business view to understand what they are building; they use the graph to trace dependencies and assess impact. Refinement sessions focus on completeness: are all constraints identified, are conditional outcomes exhaustive, are preconditions sufficient? Challenge sessions go further — deliberately probing edge cases, adversarial scenarios, and boundary conditions that the initial modelling may have missed.

The `/herbrand-challenge` skill is purpose-built for this mode. It stress-tests the model by generating scenarios the analyst may not have considered and flagging structural weaknesses in the spec.

**Lead with:** `/herbrand-review-system` for a birds-eye assessment, then `/herbrand-challenge` to probe weak points.

---

## Legacy Reverse-Engineering

**Starting condition:** an existing system — codebase, database schema, API contracts, or deployed service — where business rules are implicit in implementation rather than documented explicitly.

This is the most technically demanding entry point. The rules exist, but they are encoded in conditionals, database constraints, validation logic, and stored procedures rather than in any business-readable form. The goal is to surface them: to reconstruct the intended decision model from its implementation, make implicit rules explicit, and establish a verifiable specification that can be used for testing, refactoring, or redesign.

The agent reads technical artefacts and attempts to reconstruct decision structure from them. The process inevitably surfaces rules that were never consciously designed — encoding assumptions, historical workarounds, and undocumented constraints — and forces a conversation about whether each rule reflects genuine business intent or implementation accident.

**Lead with:** `/herbrand-primer` to define the system boundary, then `/herbrand-explore-process` informed by technical artefacts rather than domain narratives.

---

## Choosing an Entry Point

No single entry point is canonical. Projects often move through several: a greenfield discovery session followed by a domain expert interview, a post-EventStorming formalisation followed by delivery team refinement. Herbrand's pipeline is additive — specs can be written, extended, and challenged incrementally as understanding deepens.

| Entry point | Primary input | Primary skill |
|---|---|---|
| After EventStorming | EventStorming board | `/herbrand-explore-process` |
| From documents | Written artefacts | `/herbrand-explore-process` |
| Live with domain expert | Expert conversation | `/herbrand-explore-process` |
| Greenfield discovery | Domain area | `/herbrand-primer` + `/herbrand-explore-process` |
| Delivery team refinement | Existing model | `/herbrand-review-system` + `/herbrand-challenge` |
| Legacy reverse-engineering | Codebase / schema | `/herbrand-explore-process` |
