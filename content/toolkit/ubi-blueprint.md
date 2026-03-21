---
title: "UBI Blueprint"
description: "Specifications, derived models, and reactive stores to build on top of UBI"
weight: 1
toc: true
npm: "ubi-blueprint"
status: "beta"
projection: "Core framework"
tags: ["specifications", "models", "reactive stores", "foundation"]
---

## Overview

UBI Blueprint is the foundational package of the UBI toolkit. It provides the core specifications, derived models, and reactive stores that all other tools build upon. It is the direct implementation of the fundamental model — defining the information units, transformation functions, and processing stages as executable TypeScript constructs.

Where the framework describes the theory, Blueprint makes it concrete: typed specifications you can import, models you can derive from, and reactive stores that track state as information flows through your system.

## How It Relates to the Framework

Blueprint does not project the model onto a specific domain — it *is* the model, in code.

| Framework Concept | Blueprint Implementation |
|---|---|
| Information units | Typed specification objects with provenance |
| Transformation functions | Composable, typed transformers |
| Processing stages | Ordered pipelines with stage boundaries |
| Invariants | Runtime-validated constraints |
| System topology | Reactive store graph with observable state |
| Feedback loops | Subscription-based reactivity |

## Installation

```bash
npm install ubi-blueprint
```

## Usage

```typescript
import { defineSpec, deriveModel, createStore } from 'ubi-blueprint'

const spec = defineSpec({
  name: 'user-authentication',
  units: [...],
  invariants: [...]
})

const model = deriveModel(spec)
const store = createStore(model)
```

## Key Features

- **Specifications** — define information units, their types, relationships, and constraints as structured specs
- **Derived models** — generate domain-specific models from specifications, ensuring consistency with the fundamental model
- **Reactive stores** — observable state containers that track information flow through processing stages
- **Type-safe** — full TypeScript support with generics for specification and model types
- **Foundation** — all other UBI tools (Herbrand, VibeRail, Atlas, Protopal) consume Blueprint specifications
