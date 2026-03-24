---
title: "Validation Rules"
weight: 6
toc: true
---

Herbrand validates at three scopes, each gating the next stage of the pipeline. Fix errors in order — spec errors block system validation, system errors block graph building, graph errors block analysis.

## Spec Lint (13 rules)

Validates a single decision in isolation. No system context needed — just the YAML file.

### Identity & Structure

| Rule | Level | Description |
|------|-------|-------------|
| `spec/decision-has-description` | warning | Every decision should have a non-empty description. Descriptions are used in the business view and documentation. |
| `spec/decision-has-context` | error | Every decision must reference an execution context. Without it, the system can't determine where the decision runs or validate actor compatibility. |

### Policy Rules

| Rule | Level | Description |
|------|-------|-------------|
| `spec/policy-has-activation` | error | A policy must be activated by at least one outcome kind. A policy with no `activatedBy` can never fire. |
| `spec/policy-has-emits` | error | A policy must declare what intent it emits. Without `emits`, the policy produces nothing. |
| `spec/policy-has-preconditions` | info | A policy with no preconditions always fires when activated. This might be intentional (a pass-through policy) or a sign that conditions haven't been captured yet. |
| `spec/precondition-has-reads` | warning | Every precondition should declare at least one info point it reads. A precondition that reads nothing can't evaluate anything meaningful — it's either trivially true or the reads are missing. |
| `spec/precondition-has-description` | warning | Every precondition should have a description. Descriptions appear in acceptance criteria and documentation. |

### Operation Rules

| Rule | Level | Description |
|------|-------|-------------|
| `spec/operation-has-activation` | error | An operation must be activated by at least one intent kind. An operation with no `activatedBy` can never execute. |
| `spec/operation-has-unconditional-outcome` | error | Every operation must define an unconditional outcome. On success, at least one thing must happen. |
| `spec/operation-has-constraints` | info | An operation with no constraints always succeeds. This might be intentional (a simple recording operation) or a sign that failure modes haven't been explored. |
| `spec/constraint-has-reads` | warning | Every constraint should declare info point reads. A constraint that reads nothing is either trivially passing or has missing reads. |
| `spec/conditional-outcome-has-condition-reads` | warning | Conditional outcome conditions should declare what info they read. Without reads, the condition can't be evaluated. |
| `spec/outcome-has-description` | warning | Every outcome should have a description. Descriptions appear in business views and documentation. |

---

## System Lint (5 rules)

Validates cross-decision consistency. All rules are errors — if any fail, the graph cannot be built.

| Rule | Level | Description |
|------|-------|-------------|
| `system/unique-decision-ids` | error | All decision IDs must be unique across policies and operations. Duplicate IDs would corrupt the graph. |
| `system/unique-context-ids` | error | All execution context IDs must be unique. Duplicate context IDs would break lookups and boundary detection. |
| `system/unique-actor-ids` | error | All actor IDs must be unique. Duplicate actor IDs would confuse assignment resolution. |
| `system/context-exists` | error | Every decision must reference an existing execution context. A decision referencing `warehouse` when no such context is declared in `system.yaml` is a broken reference. |
| `system/context-actor-compatibility` | error | The context type determines who can act. Institutional contexts require human actors (they follow procedures physically). Software contexts require LLM or machine actors. A machine actor in an institutional context is a type error. |

---

## Graph Lint (18 rules)

Validates the decision graph topology. These are correctness checks — each implies the analyst should revise their specs.

### Reachability

| Rule | Level | What to do |
|------|-------|------------|
| `graph/no-orphan-decisions` | warning | A decision with no incoming trigger edge is unreachable. Either the activating signal is missing, or the decision's `activatedBy` is wrong. |
| `graph/no-dead-end-chains` | info | A chain from an external signal that doesn't reach any terminal outcome is incomplete. Follow the chain and add the missing operation or outcome. |

### Cycle Analysis

| Rule | Level | What to do |
|------|-------|------------|
| `graph/no-degenerate-cycles` | error | The graph contains a cycle with no termination condition. This means an infinite cascade — an outcome triggers a policy that produces an intent that triggers an operation that produces the same outcome. Add a precondition that can fail to break the cycle. |
| `graph/cycle-has-exit` | warning | A cycle exists but no policy has preconditions and no operation has conditional outcomes. The cycle has no exit path. Add at least one precondition or conditional outcome to provide termination. |

### Signal Completeness

| Rule | Level | What to do |
|------|-------|------------|
| `graph/external-signals-documented` | info | An external signal (no producing operation) enters the system. Confirm this is intentionally external (e.g., a user action, a cron trigger) or add a producing operation. |
| `graph/terminal-signals-documented` | info | A terminal signal (no listening policy) exits the system. Confirm this is intentionally terminal (e.g., a notification sent) or add a listening policy. |

### View / Side-Effect Correctness

| Rule | Level | What to do |
|------|-------|------------|
| `graph/view-has-updater` | info | A view has no updates edge — its info points are static/seed data. Either the producing effects are missing, or this data exists before the system starts. |
| `graph/circular-side-effects` | warning | An outcome updates a view that informs the operation that produced it. This is a feedback loop — the operation's constraints depend on data it just changed. Verify this is intentional. |

### Wiring Completeness

| Rule | Level | What to do |
|------|-------|------------|
| `graph/intent-has-consumer` | warning | A policy emits an intent that no operation consumes. Add an operation activated by this intent. |
| `graph/outcome-has-listener` | info | An outcome has no downstream policy. Confirm it's terminal, or add a policy that reacts to it. |
| `graph/no-duplicate-activation` | warning | An intent kind activates more than one operation. This is ambiguous routing — which operation should handle it? |
| `graph/no-duplicate-outcome-kinds` | warning | An outcome kind is produced by more than one operation. This is ambiguous sourcing — listeners can't distinguish the producer. |

### Info Point Completeness

| Rule | Level | What to do |
|------|-------|------------|
| `graph/info-point-has-producer` | warning | An info point is read by a decision but no operation produces it. Either the producing effect is missing, or this is external/seed data. |
| `graph/info-point-has-reader` | info | An info point is produced by an outcome but never read. Either this is an external output (e.g., audit log) or dead state that can be removed. |
| `graph/info-point-naming-consistency` | info | Info point names should follow dot-notation: `entity.property.subproperty`. Inconsistent naming makes the info universe harder to navigate. |

### Assignment & Orphans

| Rule | Level | What to do |
|------|-------|------------|
| `graph/actor-assigned` | warning | A decision has no actor assigned. Add an `actor` field to the YAML spec. |
| `graph/no-orphan-actors` | info | An actor is declared in `system.yaml` but not assigned to any decision. Remove the actor or assign it. |
| `graph/no-orphan-contexts` | info | An execution context is declared but no decision runs in it. Remove the context or add decisions. |
