---
title: "The SDLC Projection"
description: "Mapping the Canonical Decision System onto software delivery"
weight: 1
toc: true
---

*This section is under development.*

The Canonical Decision System provides a domain-agnostic model of socio-technical decision making. This section projects that model onto the software delivery lifecycle — mapping its abstract constructs to the concrete actors, decisions, and information flows of software organisations.

## Actors in SDLC

In the general cDS, Actors are typed as Human, Deterministic Machine, or LLM-agent. In the SDLC projection, these acquire specific roles:

| cDS Actor | SDLC Roles |
|---|---|
| Human | Product owners, business analysts, architects, developers, testers, operations |
| Deterministic Machine | Build systems, CI/CD pipelines, linters, type checkers, test runners, deployment orchestrators |
| LLM-agent | AI coding assistants, specification generators, test generators, analysis agents |

## Streams in SDLC

The canonical architecture's Intent and Outcome Streams map to the familiar artefacts of software delivery:

| cDS Construct | SDLC Manifestation |
|---|---|
| Intent Stream | Requirements, user stories, design decisions, architectural decisions, task assignments |
| Outcome Stream | Specifications, implementations, test results, build artefacts, deployment states |
| Views | Dashboards, reports, documentation, architectural views |

## Topological Boundaries

The stream sub-divisions of the cDS correspond to the organisational and process boundaries in software delivery — the separation between analysis and architecture, between architecture and development, between development and operations. These boundaries are not arbitrary; they emerge from the decision graph's topology.
