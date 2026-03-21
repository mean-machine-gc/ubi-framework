---
title: "Herbrand"
description: "Agentic tool for business analysis and business specifications"
weight: 2
toc: true
npm: "herbrand"
status: "beta"
projection: "Business Analysis projection"
tags: ["business analysis", "requirements", "specifications", "agentic"]
---

## Overview

Herbrand is an agentic system that automates the transformation of business context into structured, validated business specifications. It implements the UBI Framework's Business Analysis projection — mapping organisational needs through a sequence of well-defined transformation functions to produce traceable, auditable specifications.

Named after Jacques Herbrand, whose work in mathematical logic established foundations for automated reasoning.

## How It Relates to the Framework

In the fundamental model, business analysis is a sequence of transformation functions that progressively refine information units from stakeholder concerns to solution specifications. Herbrand makes these transformations explicit and executable:

| Framework Concept | Herbrand Implementation |
|---|---|
| Information units | Business context documents, requirements, specifications |
| Transformation functions | Agent-driven analysis, decomposition, validation |
| Processing stages | Context → Needs → Requirements → Specifications |
| Invariants | Traceability, stakeholder alignment, completeness |
| Feedback loops | Iterative refinement through validation cycles |

## Installation

```bash
npm install herbrand
```

## Usage

```bash
npx herbrand analyse ./business-context
```

Herbrand reads your business context and produces structured specifications through a multi-stage agentic pipeline.

## Key Features

- **Agentic analysis** — autonomous decomposition of business context into structured needs
- **Specification generation** — produces formal, traceable business specifications
- **Validation cycles** — built-in feedback loops that verify specification completeness and consistency
- **Provenance tracking** — every specification traces back to the business context that generated it
