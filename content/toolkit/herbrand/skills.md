---
title: "Skills"
weight: 3
toc: true
---

Herbrand uses a two-agent architecture: a **Conversation Agent** that talks to you and a background **Spec Agent** that formalizes scratchpad entries into validated YAML specs. The skills below are slash commands you can optionally invoke — the basic flow requires no commands at all.

## herbrand-primer

**Framework introduction.** Defines the agent's role as a business analyst assistant. Covers the two processing loops (intent/outcome), decision procedures, information context, three boundaries (aggregate, module, context), the scratchpad concept, the two-agent model with scratchpad coordination protocol, the FORMALIZE phase, and the workflow phases (Orient → Discover → Refine → Review → Challenge).

Use this first to orient the agent on any new project.

## herbrand-discover

**Recognising new decisions.** Teaches the Conversation Agent to listen for five recognition signals in conversations:

1. "Someone does X" → intent decision
2. "System checks X" → outcome constraint
3. "When X happens, Y reacts" → reactive chain
4. "If X fails, Z happens" → rejection flow
5. "Before X, check Y" → precondition

Discovery now ends at the scratchpad: the Conversation Agent classifies the decision, identifies which streams it touches, determines information requirements, and writes the entry to the scratchpad with `ready` status. The Spec Agent is then spawned to pick up the entry and handle formalisation, validation, and progress tracking.

## herbrand-refine

**Applying new details to existing specs.** Covers when to refine (new failure scenarios, corrections, edge cases, precision improvements, new assertions, role changes, recovery flows). The Conversation Agent captures the correction in the scratchpad; the Spec Agent picks up the change and applies it to the relevant specs — reading the current state, applying changes one element at a time, checking ripple effects across the graph, and validating after each change.

Core rule: read before edit. Never modify a spec without understanding its current state and connections.

## herbrand-review

**Presenting domain understanding to stakeholders.** Before reviewing, the Spec Agent is spawned in the foreground to ensure all specs are current with the latest scratchpad entries. Then the four-step workflow proceeds: gather intelligence via `get_user_stories` and `get_pipeline_results`, sequence the stories by flow, translate to plain language, practice active listening.

Key principle: avoid technical jargon, mirror the stakeholder's vocabulary. The output should read as business narrative, not system documentation.

## herbrand-challenge

**Stress-testing domain models.** Before challenging, the Spec Agent is spawned in the foreground to ensure specs are up to date. Then uses behaviour lint findings as starting points — translates each lint category (orphan outcomes, dead ends, unhandled rejections, information never written or read, competing decisions) into natural questions for stakeholders. Answers route back through the scratchpad and Spec Agent.

Goes beyond lint: looks for missing failure modes, single-path decisions, absent roles, timing gaps, missing undo flows. Presentation guideline: curiosity, not criticism — one or two questions per round.

## herbrand-scratchpad

**Working memory between conversations and specs.** Captures items that aren't yet ready for formalisation: raw stakeholder quotes, possible decisions (tracked with Who/Trigger/Produces/Rejects/Status/Spec-file), open questions, domain vocabulary.

Statuses: `draft`, `ready`, `formalized`, `needs-clarification`. Four readiness questions determine when a scratchpad item becomes ready: Is the trigger clear? Are the outcomes known? Is the agent assigned? Are there at least basic scenarios?

The scratchpad also includes an Agent Questions section where the Spec Agent writes clarification requests. The Conversation Agent picks these up and weaves them naturally into the dialogue. The Spec Agent coordination protocol ensures both agents stay in sync through this shared workspace.

## herbrand-formalize

**Scratchpad-to-spec mapping** (preloaded into the Spec Agent). Handles the background formalisation loop: reads `ready` scratchpad entries, maps them to YAML spec structure, writes the spec files, validates them through the Herbrand pipeline, and marks entries as `formalized`. When an entry is too vague, marks it `needs-clarification` and writes a targeted question back to the scratchpad. This skill runs silently — the user never interacts with it directly.
