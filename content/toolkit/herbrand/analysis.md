---
title: "Graph Analysis"
weight: 8
toc: true
---

Graph analysis runs on a valid, linted decision graph. These are not defects to fix — they are architectural insights that inform boundary decisions, prioritization, and system understanding. All analyses use the [graphology](https://graphology.github.io/) library.

## Boundaries

### Cross-Context Integration Points

**`analysis/cross-context-integration-points`**

Enumerates every edge that crosses an execution context boundary. Each is an integration point — a place where two systems need to communicate. Edge betweenness centrality ranks which crossings carry the most structural traffic.

**What to look for:** Many integration points between two contexts may suggest they should be merged. A single integration point between contexts is clean — it's a clear API boundary.

**Example finding:** *"library-desk → lms via lend.book intent — the librarian's lending decision crosses into the software system."*

### Execution Context Cohesion

**`analysis/execution-context-cohesion`**

For each context, counts internal edges vs cross-boundary edges. A context with high cohesion has most of its edges internal — its decisions talk to each other more than to the outside. Low cohesion suggests the context boundary doesn't match the actual data and signal flow.

**What to look for:** Contexts with 0% cohesion (all edges cross boundaries) may be too granular. Contexts with 100% cohesion may be too isolated.

**Example finding:** *"lms: 0 internal, 5 cross-boundary (cohesion: 0%) — all signal flow crosses boundaries. In a small system this is normal; in a larger system it suggests the LMS context may need to be split."*

### Execution Context Isolation

**`analysis/execution-context-isolation`**

Identifies contexts with zero cross-boundary edges. A fully isolated context processes everything internally — nothing comes in from outside and nothing goes out.

**What to look for:** Is the isolation intentional? A standalone batch job is legitimately isolated. A context that should interact with others but doesn't is missing connections.

---

## Coupling

### Cross-Context Data Coupling

**`analysis/cross-context-data-coupling`**

Finds outcomes that update views in a different execution context — shared state across context boundaries. This is a form of tight coupling: one context's operations directly affect another context's decision-making.

**What to look for:** Cross-context data coupling requires careful handling in implementation — eventual consistency, event-driven updates, or shared databases. Each instance is an architectural decision point.

**Example finding:** *"outcome in lms updates view in billing-service — the fee calculation depends on data modified by the lending system."*

---

## Impact

### High-Impact Signals

**`analysis/high-impact-signals`**

Identifies signals that trigger many decisions (high fan-out). A signal with high fan-out is a "broadcast event" — when it occurs, many parts of the system react.

**What to look for:** High-impact signals are natural (e.g., `order.placed` triggers inventory, billing, shipping, and notification). But they're also risk points — a breaking change to a high-impact signal affects everything downstream.

### Contention Hotspots

**`analysis/contention-hotspots`**

Finds views that receive many updates edges — multiple outcomes modify the same view. This is a potential consistency bottleneck: if several operations write to the same info points, concurrent execution may cause conflicts.

**What to look for:** Views updated by 3+ outcomes are worth examining. In implementation, these may need optimistic concurrency, event sequencing, or saga coordination.

### Bottleneck Detection

**`analysis/bottleneck-detection`**

Uses betweenness centrality to find decisions that all paths flow through. A decision with high betweenness is a structural bottleneck — if it breaks, many chains are disrupted.

**What to look for:** A bottleneck decision is a single point of failure. Consider: Is this intentional (a natural gatekeeper)? Should it be decomposed? Does it need higher reliability guarantees?

**Example finding:** *"lend-operation has betweenness centrality 0.038 (avg: 0.026) — it's the most critical decision in the system."*

### Blast Radius

**`analysis/blast-radius`**

For each decision, counts how many other decisions are reachable downstream via BFS. The blast radius tells you: "if this decision breaks or changes, how much of the system is affected?"

**What to look for:** Decisions with high blast radius (50%+ of the system) need careful change management. Decisions with zero blast radius are terminal — they affect nothing downstream.

**Example finding:** *"lending-policy can reach 3/14 decisions (21%) — a moderate blast radius."*

---

## Clustering

### Info Point Clustering

**`analysis/info-point-clustering`**

Builds a bipartite graph (decisions ↔ info points), projects onto the info-point side, and runs Louvain community detection. Info points that are always read and written together form natural clusters — these suggest **aggregate boundaries** in Domain-Driven Design terms.

**What to look for:** Each cluster is a candidate aggregate — a cohesive unit of data that changes together. If your execution context boundaries don't align with info point clusters, the boundaries may be wrong.

**Example finding:** *"info point cluster: [book.available, member.suspended, member.active.loans, member.max.loans] — these are all lending-state info points, suggesting a lending aggregate."*

### Decision Clustering

**`analysis/decision-clustering`**

Runs Louvain community detection on the full decision chain graph. Decisions that form a natural community are highly interconnected — they share signals and form tight reactive loops.

Compares discovered communities against authored execution contexts. When a community spans multiple contexts, the graph suggests those decisions belong together — a potential **boundary misalignment**.

**What to look for:** Communities that match contexts confirm your boundaries are sound. Communities that span contexts suggest reconsideration.

**Example finding:** *"decisions [late-fee-policy, late-fee-operation] cluster together but span contexts [lms, billing-service] — the graph suggests they belong in the same context, but billing is external. This is a real architectural boundary."*

---

## Flow

### Critical Path Analysis

**`analysis/critical-path`**

Finds shortest paths between external signals (entry points) and terminal signals (exit points). Each path is a business process traversal — the minimum number of hops from trigger to conclusion.

**What to look for:** Short paths (2-4 hops) are simple processes. Long paths (8+ hops) are complex cascades — they have more potential failure points and higher latency. The longest critical path sets the system's end-to-end complexity baseline.

**Example finding:** *"path 'book.requested' → 'book.lent': 4 hops — a straightforward process."*

### Dependency Depth

**`analysis/dependency-depth`**

The maximum cascade depth — the longest chain from any root node to any leaf node. This is the system's complexity ceiling.

**What to look for:** Depth > 8 suggests deep reactive cascades. Deep cascades are harder to reason about, slower to complete, and more fragile. Consider whether any intermediate outcomes can be parallelized.

### Temporal Ordering

**`analysis/temporal-ordering`**

Topological sort of the chain subgraph. This gives the natural implementation order: decisions that depend on nothing come first, decisions that depend on others come later.

**What to look for:** Use this to plan development sprints. Build leaf operations first (they have no dependencies), then the policies that trigger them, then the operations those policies depend on, working backward from terminal outcomes to external signals.

**Example finding:** *"implementation order: reservation-policy → return-policy → late-fee-policy → lending-policy → ... → fulfillment-operation"*

### Strongly Connected Components

**`analysis/strongly-connected-components`**

Finds all strongly connected components in the chain subgraph. Each SCC is a reactive loop — a set of decisions that feed back into each other.

**What to look for:** SCCs with more than 1 member are feedback loops. Every feedback loop needs at least one exit condition (a precondition that can fail or a conditional outcome that terminates). The `graph/cycle-has-exit` lint rule checks this, but SCCs tell you the exact loop membership.

---

## Future Analyses

The graph analysis framework is extensible. Planned additions include:

- **Actor workload balance** — which actors are overloaded vs underutilized
- **Context complexity ranking** — which contexts are most complex internally
- **Signal taxonomy** — automatic classification of entry, bridge, and terminal signals
- **View similarity** — Jaccard similarity to find merge candidates
- **Bounded context suggestion** — Louvain communities compared to authored contexts with specific move recommendations
- **PageRank on decisions** — structural importance ranking

See `docs/graph-analysis.md` in the core package for the full roadmap.
