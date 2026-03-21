---
title: "Protopal"
description: "Event-sourced frontend agentic prototyping companion"
weight: 5
toc: true
npm: "protopal"
status: "experimental"
projection: "Design projection"
tags: ["prototyping", "event-sourced", "frontend", "agentic", "design"]
---

## Overview

Protopal is an agentic prototyping companion that uses event sourcing to make the design process traceable and reversible. It implements the UBI Framework's Design projection — treating every design decision as an information unit and every iteration as an explicit transformation function.

Rather than producing static mockups, Protopal maintains a full event history of the prototype's evolution. Every state is reachable, every decision is auditable, every branch is explorable.

## How It Relates to the Framework

In the fundamental model, design is a sequence of transformations from user context through conceptual models to detailed specifications. Protopal makes this sequence concrete through event sourcing:

| Framework Concept | Protopal Implementation |
|---|---|
| Information units | Design events, component states, user flows |
| Transformation functions | Agent-assisted design iterations |
| Processing stages | Context → Concept → Prototype → Specification |
| Invariants | Accessibility, user model consistency, brand coherence |
| Feedback loops | Event replay and branch exploration |

## Installation

```bash
npm install protopal
```

## Usage

```bash
npx protopal init --framework react
npx protopal prototype ./design-context
npx protopal replay --from event-42
```

## Key Features

- **Event-sourced state** — every prototype state is an event, every mutation is recorded, every state is recoverable
- **Agentic iteration** — AI-assisted design exploration with full provenance
- **Branch and explore** — fork the prototype at any point, explore alternatives, merge back
- **Frontend-native** — generates real component code, not wireframes
- **Framework pipeline** — design specifications can flow from Protopal into VibeRail for implementation
