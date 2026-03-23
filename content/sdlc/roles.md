---
title: "Roles and Perspectives"
description: "How SDLC roles map to activities on the decision graph"
weight: 4
toc: true
draft: true
---

*This section is under development.*

## Roles as Perspectives

Traditional SDLC roles are not separate disciplines operating in sequence. They are different perspectives on the same decision graph, operating concurrently on the same artefact.

| Role | Perspective | Activity |
|---|---|---|
| Business Analyst | Decision discovery | Identifies and specifies decisions from stakeholder conversations |
| Software Architect | System topology | Designs boundaries (aggregates, modules, contexts) and stream organisation |
| Developer | Machinery builder | Implements the machine actors that evaluate decisions |
| QA Engineer | Verification designer | Ensures the constraint structure is complete and the machinery satisfies it |
| Product Owner | Human actor | The primary human participant in the running system, making intent decisions |

## Shared Artefact

All roles work on the same decision graph. The business analyst adds decisions to it. The architect organises its topology. The developer implements its machine nodes. The QA engineer verifies the implementation against it. The product owner uses the running system that embodies it.

This eliminates the handoff problem — there is no "requirements document" thrown over a wall to developers. There is a decision graph that everyone reads, writes, and verifies from their own perspective.

## The Alignment Problem

The traditional SDLC alignment problem — business and technical teams speaking different languages about the same system — dissolves when both are looking at the same formal structure:

- The business analyst sees user stories, acceptance criteria, and decision tables (derived from the graph)
- The architect sees aggregates, bounded contexts, and event flows (the graph's topology)
- The developer sees typed specs, constraints, and test examples (the graph's machine layer)

These are not different models that must be kept in sync. They are different *views* of one model. When the graph changes, all views update.
