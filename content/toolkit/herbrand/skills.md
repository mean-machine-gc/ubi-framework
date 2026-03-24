---
title: "Skills"
weight: 3
toc: true
---

Herbrand provides five skills as slash commands. Each guides the agent through a specific phase of business analysis. The agent writes YAML specs using its native file capabilities; the skills provide the conversation structure and workflow.

## herbrand-primer

**Start here.** Introduces the Herbrand framework and kicks off system discovery. On first use, it installs skills as slash commands and launches the UI workbench.

The primer covers:
- The decision model: policies (what should happen) and operations (what has happened)
- The reactive loop: outcomes → policies → intents → operations → outcomes
- Execution contexts, actors, and processes
- YAML structure with complete examples
- The MCP tools available

Then guides the agent through system discovery:
1. What systems are involved? → execution contexts
2. Who makes decisions? → actors
3. What are the main business processes? → process definitions
4. Write `system.yaml`

```
/herbrand-primer
```

## herbrand-explore-process

**Deep dive into one business process.** The core workflow — walk through a process narrative with the domain expert, discover decisions step by step, write YAML specs, validate via the lint loop, and present the business view for confirmation.

The conversation follows the chain:
- "What triggers this process?" → external signal
- "Who reacts? What do they decide?" → policy
- "What do they need to know?" → preconditions and info points
- "What can go wrong?" → constraints
- "What happens on success?" → outcomes and effects
- "Then what happens next?" → follow the chain

After each YAML file is written, the agent calls `get_lint_results` to validate. Errors are fixed immediately. Warnings become discussion points with the domain expert.

When the process is complete, the agent presents the derived business view: user stories, automations, decision tables, and acceptance criteria.

```
/herbrand-explore-process
```

## herbrand-review-system

**Birds-eye analysis** after several processes are defined. Uses graph analysis to surface architectural insights.

The agent:
1. Calls `get_system_overview` for the full picture
2. Calls `get_lint_results` for system health
3. Calls `get_graph_insights` for structural analysis
4. Presents findings by category:
   - **Boundaries**: context cohesion ratios, isolated contexts
   - **Impact**: bottleneck decisions, blast radius
   - **Clustering**: info point aggregates, boundary alignment
   - **Flow**: critical paths, implementation order

Each insight becomes a discussion point: "Does this match your understanding? Should we adjust the boundaries?"

```
/herbrand-review-system
```

## herbrand-challenge

**Devil's advocate mode.** Stress-tests the model by probing edge cases, missing failure paths, unhandled scenarios, and implicit assumptions.

Challenges each process by questioning:
- **Preconditions**: "What if this isn't met? Should something else happen, or is the silent drop correct?"
- **Constraints**: "What's the recovery path when this fails? Who gets notified?"
- **Outcomes**: "Who needs to know about this? Should another policy react?"
- **Integration points**: "What if the message is lost? What if it's delivered twice?"
- **The model itself**: "Are there decisions that happen in reality but aren't captured?"

When a challenge reveals a gap, the agent writes updated YAML specs and re-validates.

```
/herbrand-challenge
```

## herbrand-enrich

**Generate prose documentation.** Takes the structured business view and produces human-readable Markdown documents:

- `docs/system.md` — executive summary, actors, contexts, integration points
- `docs/processes/{name}.md` — per-process narrative with prose acceptance criteria, failure scenarios, and information requirements

The structured data provides the scaffold; the agent adds the prose. The documents are written to the project folder and appear live in the UI's Document view.

```
/herbrand-enrich
```

## Typical Session Flow

```
/herbrand-primer          → system discovery, write system.yaml
/herbrand-explore-process → deep dive into first process
/herbrand-explore-process → deep dive into second process
/herbrand-explore-process → ...
/herbrand-review-system   → birds-eye analysis
/herbrand-challenge       → stress-test the model
/herbrand-enrich          → generate documentation
```
