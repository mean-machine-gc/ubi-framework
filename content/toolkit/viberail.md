---
title: "VibeRail"
description: "Executable specification framework for AI-assisted, spec-driven development"
weight: 3
toc: true
npm: "viberail"
status: "beta"
projection: "Development projection"
tags: ["spec-driven", "development", "ai-assisted", "verification"]
---

## Overview

VibeRail is an executable specification framework that brings structure to AI-assisted development. Rather than generating code from vague prompts, it implements the UBI Framework's Development projection — using specifications as the governing transformation functions that constrain and direct code generation.

The name captures the idea: keep the creative energy of AI-assisted development, but on rails — guided by specifications that ensure the output is traceable, verifiable, and aligned with intent.

## How It Relates to the Framework

In the fundamental model, development is a sequence of transformations from specifications to verified, deployable artefacts. VibeRail enforces this structure:

| Framework Concept | VibeRail Implementation |
|---|---|
| Information units | Specifications, code, test artefacts, build outputs |
| Transformation functions | Spec-constrained generation, compilation, verification |
| Processing stages | Specification → Implementation → Verification → Artefact |
| Invariants | Specification conformance, type safety, test passage |
| Feedback loops | Test failures feed back to generation with spec context |

## Installation

```bash
npm install viberail
```

## Usage

```bash
npx viberail init
npx viberail generate --spec ./specs
```

VibeRail reads your specifications and generates implementation artefacts through a constrained, verifiable pipeline.

## Key Features

- **Spec-driven generation** — AI-assisted code generation governed by explicit specifications, not freeform prompts
- **Opt-in agency** — the developer controls how much autonomy the AI has at each processing stage
- **Verification built-in** — every generated artefact is verified against its specification before acceptance
- **Traceability** — full provenance from specification to implementation to test result
- **Framework integration** — specifications produced by Herbrand can flow directly into VibeRail's pipeline
