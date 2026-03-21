---
title: "Atlas"
description: "Decision graph exploration and analysis tool"
weight: 4
toc: true
npm: "atlas"
status: "experimental"
projection: "Architecture projection"
tags: ["decision graphs", "exploration", "analysis", "architecture"]
---

## Overview

Atlas is a tool for exploring and analysing the decision graphs that emerge from complex information processing systems. It implements the UBI Framework's core insight that system behaviour is determined by its topology — and makes that topology navigable.

Decision graphs are the structural backbone of the fundamental model: nodes represent information units and transformation functions, edges represent the flow and dependencies between them. Atlas makes these graphs explicit, traversable, and queryable.

## How It Relates to the Framework

Atlas operates at the meta-level of the model — rather than implementing a specific projection, it provides tooling for examining the structure that any projection produces.

| Framework Concept | Atlas Implementation |
|---|---|
| Information units | Graph nodes with typed properties |
| Transformation functions | Edges with defined semantics |
| Processing stages | Subgraph clusters at distinct abstraction levels |
| Feedback loops | Cycle detection and analysis |
| System topology | The graph itself — rendered, queryable, navigable |

## Installation

```bash
npm install atlas
```

## Usage

```bash
npx atlas explore ./system-definition
npx atlas query --cycles
npx atlas render --output graph.svg
```

## Key Features

- **Graph exploration** — navigate decision graphs interactively, tracing paths from any node
- **Structural analysis** — detect cycles, orphan nodes, bottlenecks, and unreachable states
- **Multi-level views** — collapse and expand subgraphs by abstraction level
- **Export** — render graphs as SVG, JSON, or DOT format for external tools
