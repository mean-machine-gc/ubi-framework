---
title: "Skills"
weight: 3
toc: true
---

Herbrand MCP ships with six interactive skills that guide AI agents through the business analysis workflow. They are installed automatically on startup and invoked as slash commands.

## herbrand-primer

**Framework introduction.** Defines the agent's role as a business analyst assistant. Covers the two processing loops (intent/outcome), decision procedures, information context, three boundaries (aggregate, module, context), the scratchpad concept, the five-step workflow (Orient → Discover → Refine → Review → Challenge), spec writing patterns, and validation rules.

Use this first to orient the agent on any new project.

## herbrand-discover

**Recognising and formalising new decisions.** Teaches the agent to listen for five recognition signals in conversations:

1. "Someone does X" → intent decision
2. "System checks X" → outcome constraint
3. "When X happens, Y reacts" → reactive chain
4. "If X fails, Z happens" → rejection flow
5. "Before X, check Y" → precondition

Six-step formalisation: classify the decision, identify which streams it touches, determine information requirements, write the YAML spec, validate, mark progress in the scratchpad.

## herbrand-refine

**Applying new details to existing specs.** Covers when to refine (new failure scenarios, corrections, edge cases, precision improvements, new assertions, role changes, recovery flows) and how to do it safely — read first, document in scratchpad, apply changes one element at a time, check ripple effects across the graph, validate after each change.

Core rule: read before edit. Never modify a spec without understanding its current state and connections.

## herbrand-review

**Presenting domain understanding to stakeholders.** Four-step workflow: gather intelligence via `get_user_stories` and `get_pipeline_results`, sequence the stories by flow, translate to plain language, practice active listening.

Key principle: avoid technical jargon, mirror the stakeholder's vocabulary. The output should read as business narrative, not system documentation.

## herbrand-challenge

**Stress-testing domain models.** Uses behaviour lint findings as starting points — translates each lint category (orphan outcomes, dead ends, unhandled rejections, information never written or read, competing decisions) into natural questions for stakeholders.

Goes beyond lint: looks for missing failure modes, single-path decisions, absent roles, timing gaps, missing undo flows. Presentation guideline: curiosity, not criticism — one or two questions per round.

## herbrand-scratchpad

**Working memory between conversations and specs.** Captures items that aren't yet ready for formalisation: raw stakeholder quotes, possible decisions (tracked with Who/Trigger/Produces/Rejects/Status), open questions, domain vocabulary.

Four readiness questions determine when a scratchpad item becomes a spec: Is the trigger clear? Are the outcomes known? Is the agent assigned? Are there at least basic scenarios?
