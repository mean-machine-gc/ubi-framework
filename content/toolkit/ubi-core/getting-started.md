---
title: "Getting Started"
weight: 2
toc: true
draft: true
---

## Installation

```bash
npm install ubi-core
```

## Usage

```typescript
import { defineSpec, deriveModel, createStore } from 'ubi-core'

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
- **Foundation** — all other UBI tools (Herbrand, VibeRail, Atlas, Protopal) consume Core specifications
