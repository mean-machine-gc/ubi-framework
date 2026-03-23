---
title: "Patterns"
weight: 3
toc: true
---

VibeRail provides several function patterns, each mapping to different levels of complexity in the Canonical Decision System.

## Canonical Functions

For simple functions with clear constraints, conditions, and a transform step — directly mirroring the canonical operative procedure:

```typescript
import { CanonicalFn, execCanonical } from 'viberail'

const def: CanonicalFn<ParseEmail> = {
  constraints: [
    [(input) => input.raw.includes('@'), 'invalid_format']
  ],
  conditions: [
    [(input) => true, 'parsed']
  ],
  transform: (input) => ({ email: input.raw.trim().toLowerCase() })
}

export const parseEmail = execCanonical<ParseEmail>(def)
```

The structure maps directly to the cDS operative procedure:
1. **Constraints** — evaluate what must be true (preconditions)
2. **Conditions** — evaluate which success type applies (branching)
3. **Transform** — produce the output

## Core Factories (Pipelines)

For complex functions, declare a `StepInfo[]` array describing the pipeline:

```typescript
const steps: StepInfo[] = [
  { name: 'validate', type: 'step', spec: validateSpec },
  { name: 'enrich', type: 'safe-dep', spec: enrichSpec },
  { name: 'persist', type: 'dep' },
  { name: 'route', type: 'strategy', handlers: { ... } }
]
```

Step types:

| Type | Description |
|---|---|
| `step` | Composable domain logic with its own spec |
| `safe-dep` | External dependency with validation and spec |
| `dep` | Infrastructure dependency (no spec needed) |
| `strategy` | Conditional dispatch with per-handler specs |

## Shell / Core Separation

Complex operations split into:

- **Core** — receives `{ cmd, state, ctx? }`, implements validate-transform-evaluate. Pure domain logic.
- **Shell** — orchestrates parse-fetch-resolve-core-persist. Handles infrastructure concerns.

Shell never reclassifies outcomes. The core is the decision; the shell is the plumbing.

## File Convention

Each function produces four colocated files:

```
operation-name/
  operation-name.spec.ts   # behavioural contract
  operation-name.test.ts   # auto-generated tests
  operation-name.ts        # implementation
  operation-name.spec.md   # auto-generated docs
```

Naming: kebab-case files, camelCase exports, PascalCase types, snake_case failure codes, kebab-case success types.
