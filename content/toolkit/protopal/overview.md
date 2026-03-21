---
title: "Overview"
weight: 1
toc: true
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
