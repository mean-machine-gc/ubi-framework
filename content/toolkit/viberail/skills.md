---
title: "Skills"
weight: 5
toc: true
---

VibeRail MCP ships with six interactive skills — conversational guides that walk developers through each phase of the spec-first workflow. They are installed to `.claude/skills/` by `init-project` and invoked as slash commands.

## viberail-prime

**Framework primer.** Introduces the spec-first philosophy, the four laws, and the five-step workflow (Model → Spec → Test → Implement → Docs). Use this first on any new project or with any new team member.

## viberail-discover

**Interactive domain discovery.** Maps the business domain through five phases:

1. Understand the system — nouns, verbs, states
2. Map each aggregate — data, state transitions, operations, preconditions, outcomes
3. Cross-aggregate relationships and event flows
4. Catalog external systems and infrastructure
5. Synthesize into a domain map

Produces no code — only a structured domain reference. Inquires rather than prescribes. This skill is the bridge from Herbrand's business specifications to VibeRail's technical specs.

## viberail-model

**Domain type design.** Three phases:

1. Understand the domain
2. Model each entity:
   - Discriminated unions for variants and lifecycle states
   - Identify fake primitives as value objects
   - Promote all primitives to domain type aliases
   - Declare failure unions inline with strict ordering: structural > presence > range/length > format > business > security
3. Output a `types.ts` file

Rules: no optional fields (use unions), no brands or classes, no Zod or decorators.

## viberail-spec

**Behavioural contract design.** Two modes:

- **Proposal mode** — presents a complete spec layout when patterns are recognizable
- **Guided mode** — works section by section for new domains

Covers the function taxonomy (step functions, core factories, shell factories), spec structure (`SpecFn`, `shouldFailWith`, `shouldSucceedWith`, `shouldAssert`, `steps`), and special patterns (shell/core split, safe-deps, strategy pattern).

Hard rules: spec is pure data, every failure has a group, naming conventions enforced (snake_case failures, kebab-case success types).

## viberail-implement

**Implementation guidance.** Covers all patterns:

- Atomic functions — `Fn['signature']`
- Parse functions — structural guard then accumulate
- Canonical functions — constraints, conditions, transform via `execCanonical`
- Core factories — wire steps, short-circuit on failure, end with `evaluateSuccessType`
- Shell factories — three-level currying, `_` prefix signals injection needed
- Safe-deps and strategy dispatch

*"Done means fully green. Not 'compiles'. Fully green."*

## viberail-docs

**Documentation prose writing.** Three steps:

1. Invoke `generate-docs` tool to scaffold the page
2. Review the auto-generated markdown — mechanical sections are pre-populated
3. Populate placeholder comments with business-focused prose

Creates taglines, overviews, success criteria tables, and happy-path scenarios. For new aggregates, creates index pages with lifecycle state tables and Mermaid flowcharts.
