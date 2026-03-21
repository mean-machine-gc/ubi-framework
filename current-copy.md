# Ubi: a fundamental model for complex information processing systems

Ubi is a general modelling and business analysis framework that bridges the gaps between business analysis and modern software architecture. It is primarily inspired by the work of Alberto Brandolini, Scott Wlaschin, and Herbert Simon - among many others. From the first, it borrows heavily from the EventStorming collaborative modelling technique and its mental model; from the second, it borrows ideas on functional composition and 'railway' programming; from the last, it borrows the bounded rationality theory and the decision model, as a unifying foundational model. 

This last contribution enables to bridge between business-oriented mental models on one side, and software architecture and development ones on the other. The lack of a shared model between the business-oriented practitioners and the architecture-oriented ones is a constant cause of friction and inefficiency within organisations tasked with software delivery, enterprise architecture. SHM unifies those fields by providing a more general fundamental model that generates them as constrained projections.

Besides this immediate practical objective, SHM also provides a theoretical framework for exploring governance scenarios, and for a long-term systematic study of the impacts of LLM-agents on decision systems.

## 1. The General Decision Model

Ubi conceptualises information processing as an intricate network of decisions that comply with the General Decision Model (GDM). The GDM is a high-variance model, with no other practical utility than providing the theoretical basis for more constrained and canonical models. Constraints can then be relaxed on canonical models for systematic study of scenarios and real-life applications.

The GDM elaborates on the original H. Simon formulation, but - as for all references in this copy - it is left to the reader the task to untangle, if needed, where the original concept ends and the adaptation begins; the task of this copy is to explain the SHM as a final product without the burden of precise academic citations, while attempting to state as clearly as possible any due credits and attributions of original ideas.

In the GDM, an Actor is tasked to process information in the form of producing a Choice, hence a decision. For any decision, the Actor needs to engage with three distinct Decision Stages (Tab 1, Fig 1). 

| Decision Stage        | Description                                                                        |
| --------------------- | ---------------------------------------------------------------------------------- |
| Information gathering | Gathering sufficient information for the decision                                  |
| Rationale design      | Design a reference heuristics or algorithm for processing the gathered information |
| Choice selection      | Select and return the final choice for the decision                                |

The decision process is an a act of *bounded rationality* (H. Simon), where all three decision stages are not free but constrained. This makes global optimisations of decisions impossible, as the Actor always has a constrained supply of information; a constrained decision heuristic or algorithm; might have constraints on what choices are possible; the Actor always exercises its information processing capability under its own cognition constraints; and under the affordances of its own Agency, which determines what the Actor is and what it is able to do in the world or within a particular system. We can organise and name these constraints as in Tab. 2.


| Decision stage        | Constraint                                                                                                          | Implications                                                                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Information gathering | **Information Context**: the limited set of information that is available to the Actor                              | The Actor never accesses the complete system's information space and cannot therefore optimise its decision on absolute terms; rationality is bounded, resulting choices can only be *good enough* (*i.e.* **bounded rationality** and **satisfycing** in H. Simon's terms) |
| Rationale design      | **Procedure**: a predefined heuristic, instructions, or algorithm that the Actor must follow to process information | Decisions can be classified in **Programmed** (with a standard Procedure provided, or SOP) vs **Non-Programmed**, where no standard Procedure is provided                                                                                                                   |
| Choice selection      | **Choice Space**: a pre-defined set of possible Choices that the Actor can return                                   | Decisions can be classified in **Closed Choice** vs **Open Choice**                                                                                                                                                                                                         |
| All stages            | **Cognition Limits**: the information processing limits of the Actor                                                | Even with access to complete information, the decision still remains a local optimisation problem, as the Actor is never able to process unlimited amounts of information, as a true rational decision would require                                                        |
| All stages            | **Agency**: what the Actor is and what it can do in the world or within a specific system                           | The GDM is not limited to humans, and here lies the modelling power: Actors can be humans, humans with particular roles, organisations, machines, AI-agents, as well as plants, animals, and rocks.                                                                         |

Lastly, Decisions may or may not produce tangible effects in the real world - *i.e.* Side Effects  - such as modifying existing information or creating new information. 

## 2. Decision Systems and emergent structures

Decisions do not live in isolation but they compose to generate an intricate network, *i.e.* a complex information processing system or Decision System. There are two mechanisms that allow decisions to combine with one another:

- **Dependency (or Recursion)**
- **Reactivity**

Composition by Dependency originates from the recursive nature of decisions and procedures: a procedure within a decision might contain other decisions as procedural steps. Decisions are therefore linked to each other in a Dependency Graph through their internal procedures, representing all decision nodes connected by a directional dependency edge.

Composition by Reactivity originates from the reactive nature of decisions: 1) the choice from one decision can serve as trigger of another decision, or 2) the information context of one decision can be affected by the choices of another decision as side effect. This composition mechanism gives rise to a Reactivity Graph, representing all decision nodes connected by directional reactivity edges.

The Dependency Graph and the Reactivity Graph both represent different dimensions of the Decision System as a network, and all of these three structure represent an aggregate Meta Procedure or global SOP.

The graph nature of Decision Systems makes them explorable through graph queries and analysis, in particular sub-graphs analysis and path traversal analysis.  

However, the excessive degrees of freedom of General Decision Systems make it very difficult to formulate any intent and inform any interpretation for such complex explorations and analysis, making the model void of any practical use besides providing the foundation for more constrained, meaningful, and explorable models which are derived from it by projection.

## 3. Canonical Decision System

Ubi derives from the general and foundational Decision System model a primary canonical form, the Canonical Decision System (cDS), by applying targeted constraints and so reducing the degrees of freedom. The intent is to provide a canonical model where meaningful discussion and exploration is possible, in relation to real-life use cases.

The cDS is meant to represent any socio-technical system of Humans, Deterministic Machines, and LLM-agents, engaging in inter-connected information processing and decision making. The first constrain applied is therefore the actor types, defined in Table x.

| Actor                 | Agency                    |
| --------------------- | ------------------------- |
| Human                 | Human rationality         |
| Deterministic Machine | Deterministic computation |
| LLM-agent             | Stochastic rationality    |

Because LLM-agents behaviour and their impact on decision making is part of SHM exploration, we can further constrain the system to only include Humans and Deterministic Machines at first (non-agentic cDS), and subsequently relax the constrain to explore the impact of LLM-agents on the non-agentic model (agentic cDS). The following discussion assumes a non-agentic model until the agentic model is fully and explicitly explored (coming soon).

## 4. Separating Behaviour from Bare Instructions from Views

The second constraint is to split decision in to three macro categories: Behaviour, for decisions that are representative of the system behaviour in terms of intents and outcomes; Bare Instructions, for decisions that simply describe how those goals are achieved; Views, for decisions that simply elaborate or combine existing information into a different format.  

In the Behaviour category, we have two decision types: Intent Decisions, whose choices represent the intent of something happening in the system; and Outcome Decisions, whose choices represent the outcomes of such intent, *i.e.* what has happened as a result. 

These decisions can be composed by reactivity: intents from Intent Decision trigger Outcome Decisions, and outcomes from Outcome Decisions trigger intents from Intent Decisions.

In the Bare Instructions category we have further types that express compositional levels: Pipes are composite decisions which are composed of Steps decisions; Steps decisions can themselves be Pipes or Atomic Instructions, which have no further inner composition.

These decisions can only be composed by dependency - they are nested recursively one inside the other - but they are always activated imperatively rather than reactively, hence they do not compose reactive chains, but rather chains of imperative activations.

The Views category is a flat category with no nested categories. Views are also reactive and are activated by outcomes, hence participate as nodes in the Reactive Graph. 

## 5. Canonical assignment to Actors

Intent Decisions can be equally assigned to either Humans or Deterministic Machines. If assigned to Deterministic Machines they are called Automations, or Programmed Reactive Policies. On the other hand, Outcome Decisions and View Decisions can only be assigned to Deterministic Machines. 

These assignments represent the real-life separation of concerns between the two actors: Humans decide what needs to happen, Deterministic Machines evaluate pre-programmed rules to transform those intentions in to outcomes and apply information side-effects. When safe and pre-designed, Deterministic Machines can take initiative and determine intentions by themselves as a reaction to specific outcomes (Automations).

For Bare Instructions, the assignment cascades from the root decision of which they constitute part of the standard procedure. For example, if an Intent Decision assigned to a human Actor has a procedure that involves nested Bare Instructions, then all those nested Bare Instructions are assigned to the same human Actor. If an Outcome Decision has a procedure that involves nested Bare Instructions, then all those nested Bare Instructions are assigned to the same deterministic machine Actor to which the original Outcome Decision is assigned.

## 6. Canonical Information Context

All decisions in a cDS have a Canonical Information Context describing structurally all the information available for resolving the decision. This canonical structure has always two components: 1) the Input Context, that is provided as part of the decision activation or trigger; 2) the Additional Context, that is actively procured by the Actor as part of the decision making process.

A decision has a Closed Context if all available information is provided as part of its activation payload (Input Context), hence no Additional Context is required. Conversely, a decision has Open Context, if Additional Context is required and must be actively procured.

## 7. Canonical Operative Procedure (cOP)

All decisions in a cDS  - Intent Decisions, Outcome Decisions, Bare Instructions - are programmed and closed-choice decisions each having its own Canonical Standard Operative Procedure (cSOP). 

For Intent Decisions, the cOP is:

1. Gather Additional Context (if Open Context decision)
2. Evaluate preconditions (what must be true in order to meaningfully produce the pre-defined intent)
3. If preconditions do not hold, decline the decision silently (abort decision)
4. If preconditions hold, return the pre-defined intention 

For Outcome Decisions, the cOP is:

1. Gather Additional Context (if Open Context decision)
2. Evaluate constraints (what must be true in order to produce any valid outcome)
3. If constraints are not satisfied, return a 'decision rejected' outcome, listing the constraints that did not pass
4. If constraints are satisfied:
	1. Evaluate branching conditions (what each pre-defined outcome requires to be true as its own eligibility criteria)
	2. Return all the outcomes for which conditions are true
	3. There must be at least one unconditional outcome


For Atomic Bare Instructions, the cOP is structurally the same of Outcome Decisions but it is semantically generalised:

1. Gather Additional Context (if Open Context decision)
2. Evaluate constraints (what must be true in order to produce a valid choice)
3. If constraints are not satisfied, return a 'decision rejected' choice, listing the constraints that did not pass
4. If constraints are satisfied:
	1. Evaluate branching conditions (what each pre-defined choice requires to be true as its own eligibility criteria)
	2. Return all the choices for which conditions are true
	3. There must be at least one unconditional choice

For Piped Bare Instructions, the cOP is:

1. Gather Additional Context (if Open Context decision)
2. Execute one Step decision at the time
3. If any Step decision rejects, return a 'decision rejected' choice, with the Step rejection reason enclosed
4. If there are no pre-defined side-effects: return the last Step choice
5. If there are side-effects: apply side-effects and return the last Step choice as a single operation

For View decisions, the cOP is:

1. Gather Additional Context (if Open Context decision)
2. Calculate the new view according to the pre-defined procedure
3. Return the new view

These OPs have qualitative implications for each decision Information Context, as it needs to contain sufficient information to resolve each step of each OP.

## 8. Canonical Architecture 

The cDS has a Canonical Architecture that describes the reactive dynamics of systemic decision making. The architecture rests on two fundamental components: an Intent Stream (or Ledger), and an Outcome Stream (or Ledger). Intent Decisions are activated by detecting relevant outcomes in the Outcome Stream, and deposit their own intents into the Intent Stream as a result of decision making; Outcome Decisions are activated by detecting relevant intents from the Intent Stream, and deposit their own outcomes into the Outcome Stream as a result of decision making. View decisions are activated by detecting relevant outcomes from the Outcome Stream.

This architecture reveals a reactive decision-making engine with two streams - intents and outcomes - and three reactive information processing loops: intent processing, outcome processing, view processing.

Multiple streams might exist within a single system, hence decisions tapping from or depositing to the same stream vs separate streams represent structural sub-divisions of the system that ultimately determine how the system is internally organised. To explore what these sub-divisions might be and what they might represent, we can leverage the emergent graph structures that derive from the cDS. 

## 9. Decision Graph and topological boundaries










