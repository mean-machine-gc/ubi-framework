---
title: "Canonical Decision System"
description: "A constrained, explorable model for socio-technical systems"
weight: 4
toc: true
---

Ubi derives from the general and foundational Decision System model a primary canonical form, the Canonical Decision System (cDS), by applying targeted constraints and so reducing the degrees of freedom. The intent is to provide a canonical model where meaningful discussion and exploration is possible, in relation to real-life use cases.

The cDS is meant to represent any socio-technical system of Humans, Deterministic Machines, and LLM-agents, engaging in inter-connected information processing and decision making.

## Actor Types

The first constraint applied is the actor types.

<aside class="margin-figure">
<div class="figure-label">Table 3 — Actor Types</div>
<table>
  <thead>
    <tr><th>Actor</th><th>Agency</th></tr>
  </thead>
  <tbody>
    <tr><td>Human</td><td>Human rationality</td></tr>
    <tr><td>Deterministic Machine</td><td>Deterministic computation</td></tr>
    <tr><td>LLM-agent</td><td>Stochastic rationality</td></tr>
  </tbody>
</table>
</aside>

Because LLM-agents behaviour and their impact on decision making is part of Ubi's exploration, we can further constrain the system to only include Humans and Deterministic Machines at first (non-agentic cDS), and subsequently relax the constraint to explore the impact of LLM-agents on the non-agentic model (agentic cDS). The following discussion assumes a non-agentic model until the agentic model is fully and explicitly explored.

## Separating Behaviour from Bare Instructions from Views

The second constraint is to split decisions into three macro categories: Behaviour, for decisions that are representative of the system behaviour in terms of intents and outcomes; Bare Instructions, for decisions that simply describe how those goals are achieved; Views, for decisions that simply elaborate or combine existing information into a different format.

### Behaviour

In the Behaviour category, we have two decision types: Intent Decisions, whose choices represent the intent of something happening in the system; and Outcome Decisions, whose choices represent the outcomes of such intent — what has happened as a result.

These decisions can be composed by reactivity: intents from Intent Decisions trigger Outcome Decisions, and outcomes from Outcome Decisions trigger intents from Intent Decisions.

### Bare Instructions

In the Bare Instructions category we have further types that express compositional levels: Pipes are composite decisions which are composed of Steps decisions; Steps decisions can themselves be Pipes or Atomic Instructions, which have no further inner composition.

These decisions can only be composed by dependency — they are nested recursively one inside the other — but they are always activated imperatively rather than reactively, hence they do not compose reactive chains, but rather chains of imperative activations.

### Views

The Views category is a flat category with no nested categories. Views are also reactive and are activated by outcomes, hence participate as nodes in the Reactive Graph.

## Canonical Assignment to Actors

Intent Decisions can be equally assigned to either Humans or Deterministic Machines. If assigned to Deterministic Machines they are called Automations, or Programmed Reactive Policies. On the other hand, Outcome Decisions and View Decisions can only be assigned to Deterministic Machines.

These assignments represent the real-life separation of concerns between the two actors: Humans decide what needs to happen, Deterministic Machines evaluate pre-programmed rules to transform those intentions into outcomes and apply information side-effects. When safe and pre-designed, Deterministic Machines can take initiative and determine intentions by themselves as a reaction to specific outcomes (Automations).

For Bare Instructions, the assignment cascades from the root decision of which they constitute part of the standard procedure. For example, if an Intent Decision assigned to a human Actor has a procedure that involves nested Bare Instructions, then all those nested Bare Instructions are assigned to the same human Actor. If an Outcome Decision has a procedure that involves nested Bare Instructions, then all those nested Bare Instructions are assigned to the same deterministic machine Actor to which the original Outcome Decision is assigned.

## Canonical Information Context

All decisions in a cDS have a Canonical Information Context describing structurally all the information available for resolving the decision. This canonical structure has always two components: 1) the Input Context, that is provided as part of the decision activation or trigger; 2) the Additional Context, that is actively procured by the Actor as part of the decision making process.

A decision has a Closed Context if all available information is provided as part of its activation payload (Input Context), hence no Additional Context is required. Conversely, a decision has Open Context, if Additional Context is required and must be actively procured.

## Canonical Operative Procedure

All decisions in a cDS — Intent Decisions, Outcome Decisions, Bare Instructions — are programmed and closed-choice decisions each having its own Canonical Standard Operative Procedure (cSOP).

### Intent Decisions

1. Gather Additional Context (if Open Context decision)
2. Evaluate preconditions (what must be true in order to meaningfully produce the pre-defined intent)
3. If preconditions do not hold, decline the decision silently (abort decision)
4. If preconditions hold, return the pre-defined intention

### Outcome Decisions

1. Gather Additional Context (if Open Context decision)
2. Evaluate constraints (what must be true in order to produce any valid outcome)
3. If constraints are not satisfied, return a 'decision rejected' outcome, listing the constraints that did not pass
4. If constraints are satisfied:
    1. Evaluate branching conditions (what each pre-defined outcome requires to be true as its own eligibility criteria)
    2. Return all the outcomes for which conditions are true
    3. There must be at least one unconditional outcome

### Atomic Bare Instructions

The cOP for Atomic Bare Instructions is structurally the same as Outcome Decisions but semantically generalised:

1. Gather Additional Context (if Open Context decision)
2. Evaluate constraints (what must be true in order to produce a valid choice)
3. If constraints are not satisfied, return a 'decision rejected' choice, listing the constraints that did not pass
4. If constraints are satisfied:
    1. Evaluate branching conditions (what each pre-defined choice requires to be true as its own eligibility criteria)
    2. Return all the choices for which conditions are true
    3. There must be at least one unconditional choice

### Piped Bare Instructions

1. Gather Additional Context (if Open Context decision)
2. Execute one Step decision at a time
3. If any Step decision rejects, return a 'decision rejected' choice, with the Step rejection reason enclosed
4. If there are no pre-defined side-effects: return the last Step choice
5. If there are side-effects: apply side-effects and return the last Step choice as a single operation

### View Decisions

1. Gather Additional Context (if Open Context decision)
2. Calculate the new view according to the pre-defined procedure
3. Return the new view

These OPs have qualitative implications for each decision Information Context, as it needs to contain sufficient information to resolve each step of each OP.

## Canonical Architecture

The cDS has a Canonical Architecture that describes the reactive dynamics of systemic decision making. The architecture rests on two fundamental components: an Intent Stream (or Ledger), and an Outcome Stream (or Ledger). Intent Decisions are activated by detecting relevant outcomes in the Outcome Stream, and deposit their own intents into the Intent Stream as a result of decision making; Outcome Decisions are activated by detecting relevant intents from the Intent Stream, and deposit their own outcomes into the Outcome Stream as a result of decision making. View decisions are activated by detecting relevant outcomes from the Outcome Stream.

This architecture reveals a reactive decision-making engine with two streams — intents and outcomes — and three reactive information processing loops: intent processing, outcome processing, view processing.

Multiple streams might exist within a single system, hence decisions tapping from or depositing to the same stream vs separate streams represent structural sub-divisions of the system that ultimately determine how the system is internally organised. To explore what these sub-divisions might be and what they might represent, we can leverage the emergent graph structures that derive from the cDS.
