---
title: "Non-Agentic Model"
description: "The SDLC decision system with humans and deterministic machines"
weight: 2
toc: true
---

*This section is under development.*

The non-agentic SDLC model constrains the system to Humans and Deterministic Machines only. This is the traditional software delivery model — humans make intent decisions (what should be built, how it should be designed), deterministic machines evaluate outcomes (does it compile, do the tests pass, does it deploy).

## Business Analysis

In the non-agentic model, business analysis is a chain of Intent Decisions made by human Actors operating under bounded rationality. The analyst gathers context from stakeholders (Information Gathering), applies a heuristic for structuring requirements (Rationale Design), and produces specifications (Choice Selection). Each of these stages is constrained — the analyst never has complete information, always follows some methodology, and produces choices from a finite vocabulary of requirement types.

## Architecture

Architectural decisions follow the same canonical operative procedure but with different constraints: the Information Context includes the full requirements set plus technical constraints; the Procedure draws from architectural patterns and quality attribute analysis; the Choice Space is the set of viable architectural approaches.

## Development

Development in this model is primarily Bare Instructions — nested procedural decisions that implement higher-level intent. A development task is a Pipe of Steps, each Step itself potentially a Pipe, down to Atomic Instructions (write this function, configure this service). Assignment cascades from the root decision.

## Quality Assurance

QA operates as a View and Outcome processing function — it observes the Outcome Stream (implementations) and produces Views (test results, coverage reports) and new Outcomes (defect confirmations, acceptance decisions) that feed back into the Intent Stream.
