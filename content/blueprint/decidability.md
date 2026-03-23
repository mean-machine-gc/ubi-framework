---
title: "On Decidability, Verifiability, and the cDS"
description: "Why the Canonical Decision System exists and what it guarantees"
weight: 5
toc: true
draft: true
---

*This section is a working draft — a theoretical exploration in progress.*

## The Teleological Question

Why does the Canonical Decision System exist? The earlier formulation positioned it as a projection of the General Decision Model onto socio-technical systems — a constrained version of the GDM tailored to describe how humans, machines, and AI-agents collaborate in information processing.

This section proposes a stronger reading: the cDS is not a descriptive projection but a *prescriptive canonical form* — the minimal constraint structure that guarantees **local verifiability** of each decision's output and enables **global validation and exploration** of the system's behaviour through its decision graph. Decisions are verifiable by construction, irrespective of the actor. The system as a whole is analysable as a finite structure — but the cDS does not claim global correctness.

## Decidability in Classical Terms

In mathematical logic and computer science, a problem is **decidable** if there exists an algorithm that, given any input, terminates in finite time with a correct yes/no answer. A problem is **undecidable** if no such algorithm can exist.

Jacques Herbrand's theorem (1930) was foundational to this field — it provided a method for reducing questions in first-order logic to questions about finite, checkable structures, laying groundwork for automated theorem proving and formal verification.

The decidability tradition assumes deterministic algorithms: the procedure runs, it stops, the answer is correct. This maps directly to the GDM's concept of a *programmed* decision with a *deterministic machine* actor.

## The GDM as an Unverifiable System

The General Decision Model, unconstrained, describes decision systems where neither decidability nor verifiability is guaranteed:

- **Open choice** — the set of possible outcomes is unbounded. There is no finite enumeration against which to verify.
- **Non-programmed procedure** — the heuristic for processing information is not fixed. There is no verification algorithm to apply.
- **Unbounded information context** — the information available to the Actor is not delimited. The decision space is infinite.
- **Unrestricted agency** — the Actor's cognitive capabilities are unspecified. There is no guarantee of termination or correctness.

The GDM describes reality. Reality is, in the general case, unverifiable. This is precisely why the GDM has "no other practical utility than providing the theoretical basis for more constrained and canonical models."

## Decidability and Verifiability: The Distinction

These two concepts are related but distinct:

**Decidability** is a property of a *question*: can an algorithm always answer it in finite time? In the context of a decision, the question is: "can the actor, following the procedure, always produce a valid choice?" This depends on the pairing of the actor and the procedure:

- A **deterministic machine** executing a programmed procedure — decidable in theory and practice. The algorithm exists and the actor can execute it.
- A **human** following a canonical operative procedure — decidable in theory (the algorithm exists) but uncertain in practice (the actor may not be able to execute it fully due to cognitive limits, bounded rationality, fatigue, error).
- An **LLM-agent** following a procedure — the algorithm exists but the execution is stochastic. The same input may produce different outputs. Classical decidability is ill-formed here.

**Verifiability** is a property of a *claim*: given a specific output, can we check whether it satisfies the constraints? This depends only on the constraint structure, not on the actor:

- Is the choice a member of the closed choice space? (Finite enumeration — checkable.)
- Do the constraints hold? (Explicit predicates — evaluable.)
- Which conditions are satisfied? (Defined branching — deterministic.)

The relationship: decidability of the *generation* varies by actor. Verifiability of the *output* is invariant — if the constraint structure is canonical, any output can be verified regardless of how it was produced.

## The cDS Guarantee: Verifiability by Construction

The Canonical Decision System applies targeted constraints that, taken together, guarantee that every decision's output is verifiable:

| GDM (unconstrained) | cDS (constrained) | Verifiability effect |
|---|---|---|
| Open choice | **Closed choice** — finite, predefined set of possible outcomes | The verification target is enumerable |
| Non-programmed | **Programmed procedure** — canonical operative procedure | The verification algorithm exists and terminates |
| Unbounded context | **Canonical information context** — Input Context + Additional Context | The verification scope is bounded |
| Unrestricted agency | **Any actor** — governed by the above constraints | The actor proposes; the constraints verify |

The critical insight is in the last row. The cDS does not constrain the actor. It constrains the *decision structure* so that any output from any actor can be verified. A human, a deterministic machine, and an LLM-agent can all participate in the same decision system — the verification is the same for all of them.

This is not verification as an external audit applied after the fact. The canonical operative procedure *is* the verification algorithm. It is built into the structure of each decision:

1. Gather context (bound the information space)
2. Evaluate constraints (check necessary conditions)
3. If constraints fail, reject (verifiable rejection)
4. If constraints hold, evaluate conditions (deterministic branching)
5. Return outcome from closed choice space (verifiable membership)

Verification is not layered on top of the decision system. It is what the decision system *does*. This is what "verifiability by construction" means — the cDS does not *add* verification to decisions, it *defines* decisions as structures that are inherently verifiable.

## The Actor Question, Reframed

The original cDS formulation distinguished three actor types — Human, Deterministic Machine, LLM-agent — as a structural element, and separated the model into agentic and non-agentic variants.

Under the verifiability reading, this distinction is not structural but practical:

- **Actor type affects generation.** How reliably and consistently does the actor produce choices? A deterministic machine always produces the same output. A human might not. An LLM-agent almost certainly won't. This matters for system design, performance, and trust.
- **Actor type does not affect verification.** The constraints, choice space, and operative procedure are the same regardless of who proposes the choice. Verification is deterministic even when generation is not.

The cDS therefore does not need separate agentic and non-agentic formulations. One model accommodates all actors. The constraints — not the actors — are what produce verifiability.

Different actors bring different risks (stochastic generation may produce unexpected choices more frequently), but these risks are *caught by verification*, not prevented by restricting the actor. The system remains governable because the verification is always decidable, even when the generation is not.

## Implications

This reading reframes several aspects of the framework:

1. **The cDS operates at two levels.** Locally, each decision is verifiable by construction — its output can always be checked against its constraints. Globally, the decision graph is a finite structure that can be validated for structural soundness and explored for system-wide behavioural patterns. The cDS does not claim global correctness of the running system.

2. **Actor types are parameters, not structure.** One model, any actor. The constraints are the architecture. The actors are pluggable. Local verifiability holds regardless of actor type.

3. **AI governance becomes a constraint design problem.** The question is not "how do we control AI agents?" but "are the local constraints sufficient to make every decision's output verifiable, and is the global graph structurally sound?"

4. **The toolkit maps to both levels.** Herbrand operates globally: it validates the decision graph's structure (spec-level and behaviour-level linting — are the specs well-formed? are there orphan outcomes, dead ends, structural gaps?). VibeRail operates locally, via Phenomena: it verifies that each machine actor's output satisfies its constraints (does the code produce results that match the spec?). Both insist on the cDS as their reference model.

5. **Trust shifts from actors to constraints.** You don't need to trust that the analyst got the requirements right, that the developer implemented correctly, or that the AI agent generated valid code. You need to trust that the local constraints are well-defined and the global graph is structurally sound. If they are, local verification catches output errors and global validation catches systemic ones.

## Relationship to Formal Proof

A formal proof, in logic and mathematics, is a finite sequence of well-formed formulas, each of which is an axiom, an assumption, or follows from preceding formulas according to rules of inference. Formal proofs are rigorous, unambiguous, and mechanically verifiable. Critically: checking a formal proof is simple, while *finding* a proof is computationally intractable.

The cDS exhibits the structure of a formal system:

| Formal System Concept | cDS Equivalent |
|---|---|
| Formal language | The spec formats (YAML, TypeScript) — defined syntax, unambiguous grammar |
| Well-formed formulas | Valid specs — those that pass structural and semantic linting |
| Axioms | The cDS constraints — closed choice, programmed procedure, canonical information context |
| Rules of inference | The canonical operative procedures — the defined steps by which one decision's output triggers another |
| Derivation | The decision graph — a sequence of decisions, each following from the preceding ones |
| Theorem | A fully validated and verified system — the statement that this system conforms to its constraints |
| Proof checking | Validation (Herbrand) and verification (VibeRail) — both mechanical and deterministic |

The parallel with formal proof's central asymmetry is exact: **checking is easy, generating is hard.** The actor (human, machine, or LLM-agent) struggles to produce the right choice — that is the hard, potentially intractable part. But checking whether the choice conforms to the constraints is mechanical and always terminates. This is the same asymmetry that makes formal proof checking tractable while automated theorem proving is not.

However, the cDS diverges from formal proof in one important respect. Formal proof is about **truth** — deriving true statements from axioms. The cDS is about **conformance** — checking that decisions satisfy constraints. A validated and verified decision graph does not prove that the system is *correct* in some absolute sense. It proves that the system *conforms to its specification*.

This has a surface resemblance to **model checking**, which asks "does this system satisfy this property?" But the cDS makes a fundamentally different move.

## Local Verification, Global Exploration

Traditional model checking attempts to verify global temporal properties of a system by exploring its full state space — all possible states the system can be in, all possible transitions between them. For hardware with finite state machines, this is tractable. For software, the state space is potentially infinite (unbounded memory, unbounded recursion, unbounded inputs), and model checking hits the computability wall: it cannot be fully algorithmic, apply to all systems, and always give an answer.

The cDS sidesteps this entirely by operating at two distinct levels:

**Verification is local — at the level of each individual decision.**

Each decision is verified against its own constraints: does this output belong to this finite choice space? Do these explicit predicates hold? Is the information context bounded? These questions are always decidable because the choice space is closed (finite enumeration, not infinite state exploration), the constraints are explicit predicates (evaluate and return, always terminate), and the information context is bounded (the verification scope is delimited). No state space explosion. No halting problem. No computability limits.

**Exploration is global — at the level of the decision graph.**

The decision graph is a finite structure — nodes and edges, not runtime states. It can be traversed, queried, and analysed without encountering computability limits. Herbrand's behaviour-level linting operates here: detecting orphan outcomes, dead ends, unconsumed intents, unhandled rejections, competing decisions. These are structural properties of a finite graph, always decidable.

But the decision graph does not *prove* that the running system will always behave correctly in all possible states. It is a **model for exploring system-wide behaviour** — a navigable representation of how decisions connect, how information flows, where reactive chains lead. It reveals structural patterns, boundary violations, and topological problems. It is an analytical tool, not a correctness proof.

The distinction matters:

| | Model Checking | cDS |
|---|---|---|
| **Scope** | Global system properties | Local decision conformance + global graph structure |
| **State space** | All possible runtime states (potentially infinite) | Each decision's choice space (always finite) |
| **Limitation** | Undecidable for general software | Always decidable |
| **Guarantee** | "The system satisfies this temporal property" | "Each decision conforms to its constraints, and the graph is structurally sound" |
| **What it doesn't claim** | — | That the running system will behave correctly in all states |

This is a weaker claim than model checking, but it is a claim that is **always achievable** — no computability limits, no state explosion, no undecidability. And in practice, it may be more useful: most software failures are not exotic temporal logic violations. They are individual decisions that did not satisfy their constraints.

---

## References

The following works are relevant to the concepts discussed in this section. Some have directly informed the framework; others provide theoretical context for the claims made here.

### Decision Theory and Bounded Rationality

- Simon, H.A. (1947). *Administrative Behavior*. Macmillan. — The foundational work on bounded rationality and satisficing.
- Simon, H.A. (1960). *The New Science of Management Decision*. Harper & Row. — Introduces the programmed/non-programmed decision distinction.
- Simon, H.A. (1996). *The Sciences of the Artificial* (3rd ed.). MIT Press. — Decision making in artificial systems, bounded rationality in designed systems.

### Decidability and Computability

- Herbrand, J. (1930). *Recherches sur la théorie de la démonstration*. PhD thesis, University of Paris. — Herbrand's theorem: reducing first-order logic to finite checkable structures.
- Turing, A.M. (1936). "On Computable Numbers, with an Application to the Entscheidungsproblem." *Proceedings of the London Mathematical Society*. — Foundational paper establishing undecidability of the halting problem.
- Sipser, M. (2012). *Introduction to the Theory of Computation* (3rd ed.). Cengage Learning. — Standard reference for decidability, computability, and complexity theory including probabilistic models (BPP).
- Cutland, N.J. (1980). *Computability: An Introduction to Recursive Function Theory*. Cambridge University Press. — Accessible introduction to decidability and computability.

### Formal Proof and Formal Systems

- Enderton, H.B. (2001). *A Mathematical Introduction to Logic* (2nd ed.). Academic Press. — Formal languages, formal systems, proof theory, model theory.
- Harrison, J. (2009). *Handbook of Practical Logic and Automated Reasoning*. Cambridge University Press. — Automated theorem proving, proof checking, decision procedures.
- Huth, M. & Ryan, M. (2004). *Logic in Computer Science: Modelling and Reasoning about Systems* (2nd ed.). Cambridge University Press. — Formal proof, model checking, and verification applied to computational systems.

### Probabilistic and Stochastic Computation

- Arora, S. & Barak, B. (2009). *Computational Complexity: A Modern Approach*. Cambridge University Press. — Covers BPP, probabilistic polynomial time, and the relationship between deterministic and probabilistic computation.
- Motwani, R. & Raghavan, P. (1995). *Randomized Algorithms*. Cambridge University Press. — Foundational text on probabilistic algorithms and their guarantees.

### Verification and Formal Methods

- Baier, C. & Katoen, J.-P. (2008). *Principles of Model Checking*. MIT Press. — Formal verification of systems, model checking as decidability applied to system properties.
- Clarke, E.M., Grumberg, O., & Peled, D.A. (1999). *Model Checking*. MIT Press. — Automated verification of finite-state systems.

### Domain Modelling and Event-Driven Architecture

- Brandolini, A. (2021). *Introducing EventStorming*. Leanpub. — The EventStorming collaborative modelling technique and its mental model.
- Wlaschin, S. (2018). *Domain Modeling Made Functional*. Pragmatic Bookshelf. — Functional domain modelling, railway oriented programming, making illegal states unrepresentable.
- Vernon, V. (2013). *Implementing Domain-Driven Design*. Addison-Wesley. — CQRS, Event Sourcing, aggregates, bounded contexts.
- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley. — The foundational DDD text.

### AI Agents and Governance

- Russell, S. & Norvig, P. (2020). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson. — Rational agents, decision theory under uncertainty, bounded rationality in AI.
- Amodei, D. et al. (2016). "Concrete Problems in AI Safety." *arXiv:1606.06565*. — Practical challenges in verifying AI agent behaviour.
- Gabriel, I. (2020). "Artificial Intelligence, Values, and Alignment." *Minds and Machines*, 30, 411–437. — The alignment problem framed as a constraint design problem.
