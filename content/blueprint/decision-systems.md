---
title: "Decision Systems"
description: "How decisions compose into complex information processing networks"
weight: 3
toc: true
---

Decisions do not live in isolation but they compose to generate an intricate network — a complex information processing system or Decision System. There are two mechanisms that allow decisions to combine with one another:

- **Dependency (or Recursion)**
- **Reactivity**

## Composition by Dependency

Composition by Dependency originates from the recursive nature of decisions and procedures: a procedure within a decision might contain other decisions as procedural steps. Decisions are therefore linked to each other in a Dependency Graph through their internal procedures, representing all decision nodes connected by a directional dependency edge.

## Composition by Reactivity

Composition by Reactivity originates from the reactive nature of decisions: 1) the choice from one decision can serve as trigger of another decision, or 2) the information context of one decision can be affected by the choices of another decision as side effect. This composition mechanism gives rise to a Reactivity Graph, representing all decision nodes connected by directional reactivity edges.

## Emergent Structures

The Dependency Graph and the Reactivity Graph both represent different dimensions of the Decision System as a network, and all of these three structures represent an aggregate Meta Procedure or global SOP.

The graph nature of Decision Systems makes them explorable through graph queries and analysis, in particular sub-graphs analysis and path traversal analysis.

However, the excessive degrees of freedom of General Decision Systems make it very difficult to formulate any intent and inform any interpretation for such complex explorations and analysis, making the model void of any practical use besides providing the foundation for more constrained, meaningful, and explorable models which are derived from it by projection.
