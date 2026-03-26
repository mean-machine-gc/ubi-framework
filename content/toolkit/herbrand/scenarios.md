---
title: "On Scenarios and Acceptance Criteria"
weight: 10
toc: true
---

Herbrand derives scenarios, acceptance criteria, decision tables, and user stories deterministically from the behavioural model. These artefacts are not authored — they are generated from the spec, regenerated whenever the spec changes, and exhaustive by construction.

This inverts the usual relationship between specification and example. In practices such as BDD and Specification by Example, *examples are the specification* — scenarios are authored to express intended behaviour, and their accumulated set becomes the living documentation. In Herbrand, **the behavioural model is the specification**, and scenarios are a derived view of it. Coverage is a structural consequence of model completeness, not a separate authoring concern.

---

## The Derived Artefacts

Each policy–operation pair produces a complete set of business artefacts, derived by the pipeline.

### User Stories

One user story per policy–operation pair, in the voice of the actor who executes the policy.

```
As a Librarian
I want to lend a book to a member
So that members can borrow books from the library
```

### Acceptance Criteria

Structured around the operation's decision model:

- **Precondition scenarios** — one per precondition, testing the silent drop when it fails
- **Constraint scenarios** — one per constraint and per constraint combination, testing `OperationFailed` and its violation list
- **Success scenarios** — one for the unconditional outcome, plus one per conditional outcome

Adding a constraint automatically adds a new scenario class. The structure is determined by the spec; nothing needs to be manually enumerated.

### Decision Tables

A tabular representation of the constraint space, mapping every condition combination to its expected outcome. Decision tables were formalised in the IBM structured analysis tradition of the 1960s; in classical use, completeness must be verified manually. In Herbrand it is a property of the derivation.

| book-available | member-not-suspended | under-loan-limit | Outcome |
|---|---|---|---|
| ✓ | ✓ | ✓ | `book.lent` |
| ✗ | — | — | `OperationFailed` [book-available] |
| ✓ | ✗ | — | `OperationFailed` [member-not-suspended] |
| ✓ | ✓ | ✗ | `OperationFailed` [under-loan-limit] |

### Scenarios

Each acceptance criterion expressed in Given / When / Then form. The structure is fixed by the behavioural model; concrete values are the only thing left to supply when the spec transitions toward executable verification.

```
Scenario: Book is not available
  Given a book that exists in the catalog
  And the book is currently on loan
  And the member exists and is not suspended
  And the member is under their loan limit
  When the librarian attempts to lend the book
  Then the operation fails
  And the violation list contains [book-available]
  And no state is modified
```

## Derivation from the Behavioural Model

Herbrand treats the behavioural model as the primary artefact and scenarios as a derived view of it. The creative effort shifts from *what examples should we write?* to *is the model correct and complete?* — a question the lint pipeline, graph analysis, and challenge skill are designed to answer. The practices surveyed below share a different assumption: that scenarios are authored, and quality depends on the authors' thoroughness. This is the natural consequence of treating examples as the primary specification artefact.

There is a further dependency that example-driven practices rarely make explicit. A concrete example is an instantiation — it requires entities with attribute values: a specific book, a specific member, a specific loan count. Writing examples therefore presupposes an entity model. If that model has not yet emerged from the behavioural analysis, examples either remain vacuous or quietly commit to a data structure that should be a *consequence* of behaviour, not a premise of it.

Herbrand removes this forcing function. Scenarios are derived from the behavioural model, not from instances, so they carry no implicit entity commitment. Concrete values enter the picture only when a part of the system is mature enough — its behaviour validated, its info points settled — to support instantiation without risk of premature modelling. The transition from derived scenarios to executable examples is not a methodology choice; it is a signal that the behavioural model for that part of the system has stabilised.

---

## Relationship to Established Concepts

The practices in this section were instrumental in shaping Herbrand. BDD's insistence on shared language between domain experts and developers, SBE's elevation of examples to specification artefacts, Example Mapping's explicit separation of rules from examples, ATDD's spec-before-code discipline, and the Three Amigos' collaborative quality gate — all of these are ideas Herbrand builds on. The comparisons below are about where Herbrand formalises what these practices expressed as convention, and where it introduces sequencing constraints that the practices left to the team's judgment.

### BDD and Given / When / Then (North, 2006)

GWT maps directly onto Herbrand's structure: Given captures precondition context and the info points read, When is the intent, Then is the outcome and its effects. But GWT in Herbrand is a *rendering format*, not the model — one projection of the behavioural spec, generated for human readability or test tooling consumption.

In BDD, the scenarios teams author *are* the specification; coverage depends on authoring thoroughness. In Herbrand, scenarios are derived from the behavioural model, and coverage follows from model completeness.

| | BDD | Herbrand |
|---|---|---|
| Specification source | Authored GWT scenarios | Behavioural model (YAML) |
| Scenario coverage | Depends on authoring thoroughness | Exhaustive by model structure |
| GWT role | The specification | A rendering of the specification |
| Drift risk | Scenarios can diverge from intent | Scenarios regenerated from spec — no drift |

### Specification by Example (Adzic, 2011)

SBE's central principle — *examples are the specification* — and its emphasis on concrete, agreed-upon instances of behaviour as the basis for living documentation is something Herbrand fully endorses. Where Herbrand is opinionated is on sequencing and dependency: examples should be informed by an existing behavioural model, not authored before one exists. Their coverage and structure cannot be reliably determined without it.

In Herbrand, examples are a later concern — they contribute to executable specifications, which is a verification activity that follows the preliminary definition and validation of behaviour that business analysis targets. The behavioural model comes first; examples populate the scenario space it defines. This preserves SBE's principle that examples are agreed upon before building, and strengthens it: the entire scenario universe is structurally available before building begins, not just the cases the team happened to think of.

### Example Mapping (Wynne, 2015)

Example Mapping organises pre-BDD conversations with index cards: stories (yellow), rules (blue), examples (green), questions (red). It makes the relationship between rules and examples explicit before writing any GWT.

The Herbrand equivalent of a blue card is a constraint or precondition; green cards are the scenarios derived from it; red cards are lint warnings and open issues. The structural insight behind Example Mapping — *rules and examples are distinct, and rules come first* — is a structural property of the Herbrand model. Example Mapping is a technique for discovering what the spec should contain; Herbrand is the spec that results, with the green cards generated rather than authored.

### ATDD

ATDD places acceptance criteria before implementation — the right sequence — but acceptance tests are still authored manually, which introduces coverage and drift risks. Herbrand supplies the acceptance criteria layer ATDD assumes but does not specify how to produce: a complete, model-derived acceptance target available before implementation begins.

### Three Amigos

The Three Amigos practice is a quality gate: BA, developer, and tester review a story together to surface missing rules and edge cases. Herbrand's live modelling sessions and `/herbrand-challenge` skill serve the same purpose with a different question. Instead of *what cases did we miss?* the team asks *what is missing from the behavioural model?* — targeting the source of incompleteness rather than its symptoms.
