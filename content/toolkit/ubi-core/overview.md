---
title: "Overview"
weight: 1
toc: true
---

## Overview

UBI Core is the foundational package of the UBI toolkit. It provides the core specifications, derived models, and reactive stores that all other tools build upon. It is the direct implementation of the fundamental model — defining the information units, transformation functions, and processing stages as executable TypeScript constructs.

Where the blueprint describes the theory, Core makes it concrete: typed specifications you can import, models you can derive from, and reactive stores that track state as information flows through your system.

## How It Relates to the Blueprint

Core does not project the model onto a specific domain — it *is* the model, in code.

| Blueprint Concept | Core Implementation |
|---|---|
| Information units | Typed specification objects with provenance |
| Transformation functions | Composable, typed transformers |
| Processing stages | Ordered pipelines with stage boundaries |
| Invariants | Runtime-validated constraints |
| System topology | Reactive store graph with observable state |
| Feedback loops | Subscription-based reactivity |
