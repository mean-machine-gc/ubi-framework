---
title: Meta-language
layout: layout.njk
---
# Meta-Language


## A Ubiquitous Vocabulary for Software Behavior

The Ubi meta-language establishes a shared vocabulary for describing software behavior with precision across every stage of development. It addresses the fundamental challenge of maintaining consistency between business requirements and technical implementation.

## The Foundation of Software Behavior

Software behavior involves agents interacting with information systems. An **Agent** - whether human or machine - accesses and modifies information within a system. We represent the information at any moment as **State**, but agents interact through focused **Views** rather than accessing raw state directly.

Agents send **Queries** to retrieve views and **Commands** to trigger operations. When operations complete, the system emits **Events** that signal meaningful outcomes.

This pattern reflects standard business interactions: customers see order forms, managers approve requests, systems respond to specific triggers.

## Operations: Atomic Business Actions

An **Operation** represents the fundamental unit of software behavior - a command issued by an agent that results in an event.

**Format**:

```
When <Agent issues Command>, Then <Event happened>
```

Examples:

- When Customer issues PlaceOrder, Then OrderPlaced
- When System issues ProcessPayment, Then PaymentProcessed

This corresponds to the command-event sequences captured in EventStorming sessions, providing a natural language expression of business actions.

## Policies: System Reactions

**Policies** define how systems react to events, implementing business rules and triggering subsequent actions.

**Format**:

```
Whenever <Event happened>, Then <Command is issued>
```

Examples:

- Whenever OrderPlaced, Then CheckInventory is issued
- Whenever PaymentFailed, Then NotifyCustomer is issued

Policies represent the automation points in business processes, whether fully automated or requiring human intervention.

## Processes: Complex Workflows

**Processes** compose operations and policies to describe complete business workflows.

**Synthetic Format** (outcome-focused):

```
When PlaceOrder, 
Then OrderConfirmed, 
And PaymentProcessed, 
And ItemsShipped
```

**Verbose Format**: Complete sequence of operations and policies listed in order.

The synthetic format communicates overall outcomes while the verbose format provides implementation detail.

## Business Rules and Edge Cases

Real operations must handle business complexity beyond simple success scenarios.

**Enhanced Operation Format**:

```
Given that <Guards>,
When <Command>,
And <Preconditions>,
Then <Common Events>,
Branch [And <Branching Logic>, And <Additional Events>]
```

**Guards**: Access control and security rules that determine operation eligibility.

**Preconditions**: Business validations required for success. Failed preconditions generate specific failure events.

**Branching Logic**: Conditions that determine additional events for different success scenarios.

**Example**:

```
Given that Customer is authenticated,
When PlaceOrder,
And Customer has valid payment method,
And Items are in stock,
Then OrderConfirmed,
Branch [And Order total > €100, And HighValueOrderFlagged]
```

## Software Capabilities

These behavioral concepts scale to describe what software components provide:

**Capabilities** consist of:

- **Views** exposed through **Queries** (read operations)
- **Operations/Processes** exposed through **Commands** (write operations)
- **Policies** implemented internally or through **Subscribed Events** (reactions)
- **Published Events** for integration with other components

## APIs and Modules

**APIs** expose capabilities through specific interfaces:

- Queries for accessing views
- Commands for triggering operations
- Subscribed events for activating policies
- Published events for system integration

A **Module** is any software component that exposes capabilities through an API, from individual functions to complete systems.

**Example**: Customer Management Module

- **Queries**: GetCustomerProfile, GetCustomerOrders
- **Commands**: RegisterCustomer, UpdateProfile
- **Subscribed Events**: OrderPlaced, PaymentFailed
- **Published Events**: CustomerRegistered, CustomerDeactivated

## Modular Behavior Foundation

The meta-language provides consistent vocabulary from individual operations to distributed system architectures. The same concepts that describe simple business actions also describe complex enterprise capabilities.

This consistency enables the description of **modular behavior** - how systems composed of multiple modules interact through their APIs. When modules communicate through commands, events, and queries, they use the same behavioral vocabulary that describes their internal operations.

The meta-language thus serves as the foundation for both individual module design and inter-module communication, enabling precise behavioral specifications at every scale of system architecture.


___



# Modular System Behavior

## Describing Interactions Between System Components

The meta-language extends naturally from individual module behavior to describe how systems composed of multiple modules interact through their APIs. When modules communicate through commands, events, and queries, they use the same behavioral vocabulary that describes their internal operations.

## Sagas: Cross-Module Processes

A **Saga** is a process that spans different modules, also referred to as a Long-running Workflow or Distributed Workflow when modules are deployed separately. Sagas represent business processes that cannot be contained within a single module's transactional boundary.

Unlike operations within a single module, sagas are harder to govern and ensure consistency of state. When something goes wrong during a saga, compensating actions may be needed to maintain business consistency.

### Saga Governance Patterns

**Centralized Orchestration**: A dedicated component manages the entire saga sequence, issuing commands to participating modules and handling coordination logic.

**Decentralized Choreography**: Modules react to events in a distributed fashion without central control, with each module knowing how to respond to relevant events.

Both patterns highlight a fundamental constraint: distributed transactions are problematic and should be avoided. This leads to the principle that sustainable modular systems must be composed of loosely coupled modules that are internally highly cohesive (Constantine's Law).

## Module Coupling and Message Ownership

The coupling direction between modules depends on messaging flow and ownership of message schemas.

**Upstream and Downstream Relationships**: A module is **upstream** to another if changes to the upstream module propagate to the downstream module.

### Event-Based Interaction

When module A publishes an event to which module B subscribes, module A is upstream because it dictates the schema of the event. Module B must adapt to changes in the event structure.

### Command-Based Interaction

When module B provides a command interface that module A calls, module B is upstream because it owns the schema of the command. Module A must conform to the command interface defined by module B.

This demonstrates that the same business behavior can have different coupling directions depending on the chosen interaction pattern.

## Transactional Boundaries

The coupling considerations highlight the critical importance of architectural design and pose the fundamental problem of **transactional boundaries**: modules should represent information that needs to change together transactionally.

Finding appropriate transactional boundaries is a core objective of modular system design. A rule of thumb in microservice design is that good boundaries are the ones that reflect business boundaries.

### Business Boundary Alignment

Modules should be designed according to business processes or entities rather than technical concerns. This alignment ensures that:

- Related business data changes together within single transactions
- Module boundaries correspond to natural business ownership
- Cross-module coordination reflects genuine business process requirements
- System evolution aligns with business evolution

## Design Implications

This analysis leads to several key design principles:

**Accept Eventual Consistency**: Recognize that eventual consistency is an inherent part of modular design, with strict transactions delegated to individual modules.

**Design Modules According to Transactional Boundaries**: Ensure modules encapsulate information that needs to change together transactionally.

**Choose Interaction Patterns Deliberately**: Select event-based or command-based interactions based on desired coupling direction and business ownership models.

**Design for Compensating Actions**: Support compensating actions that can restore business consistency when sagas encounter failures.

The next sections explore how to identify appropriate transactional boundaries through the concepts of aggregates and entity lifecycles, providing practical guidance for applying these principles in modular system design.


___



# Aggregates and Lifecycles

## Identifying Transactional Boundaries Through Business Behavior

The concept of aggregates in software design is often misunderstood. Rather than thinking in terms of object hierarchies, it helps to approach aggregates through transactional boundaries and information that needs to change together.

## Building Transactional Boundaries

### Values

The simplest transactional boundary is a single **Value** that always changes as a unit. A multi-property value like Money(quantity, currency) demonstrates this principle - both properties must change together in a transaction to maintain consistency.

### Entities and Lifecycles

**Entities** represent sets of information with business relevance, characterized by unique identity and lifecycle. The **lifecycle** expresses all changes of state the entity experiences over time.

State changes are triggered by commands and signaled by events, making each state change a state transition operation in our meta-language. Entity lifecycles can be complex, with each state accepting only specific commands that lead to particular destination states, governed by business rules.

### Lifecycle as State Machine

The lifecycle can be expressed visually as a state machine diagram that encapsulates basic rules:

- What commands each state accepts
- Valid destination states for each transition
- All possible operations for the entity

This state machine representation provides a solid foundation for outlining capabilities and APIs. When integrated with business rules, it describes the complete behavior of the entity.

### Entities as Transactional Boundaries

Entity properties need to change transactionally to maintain consistency, making entities natural transactional boundaries. However, business operations often require multiple entities to change together.

## Aggregates: Coordinated Transactional State

When different entities need to change together transactionally, an **Aggregate** entity ensures inner entities are modified atomically to maintain state consistency.

Aggregates should not be conceived as object hierarchies but as **the transactional state required for a set of operations**. They often correlate with specific business processes rather than data relationships.

### Decision Models

A **Decision Model** represents all information needed to execute an operation - everything required to evaluate business rules and produce new state and events.

The decision model combines:

- Information contained in commands for an aggregate
- Information contained in the aggregate itself

This comprehensive information set enables complete business rule evaluation during operation execution.

### Behavior-Driven Design

Reasoning about the Decision Model - what information is sufficient to evaluate all business rules - typically yields better design results than focusing on the shape of business objects.

**Design must be informed by behavior rather than data structure.**

This approach ensures aggregates contain exactly the information needed for their operations, no more and no less.

## Practical Application

### Identifying Aggregates

Start with business operations and ask:

- What information is needed to execute this operation?
- What entities must change together to maintain consistency?
- What business rules must be evaluated?
- What decision model encompasses all required information?

### Lifecycle Analysis

For each entity within an aggregate:

- Map the complete lifecycle as a state machine
- Identify all valid state transitions
- Define commands accepted by each state
- Specify business rules governing transitions

### Aggregate Boundaries

The aggregate boundary encompasses:

- All entities that must change together transactionally
- All information needed for decision models
- All state required for business rule evaluation

An important consideration is that the same entity might be present in different aggregates if different parts of its lifecycle are involved, provided those lifecycle parts are disjointed and don't require simultaneous transactional changes.

## Modular Design Implications

Aggregates provide natural boundaries for module design because they represent the transactional units that business operations require. When modules are designed around aggregates:

- Business operations can complete within single module boundaries
- Transactional consistency is maintained within modules
- Cross-module coordination reflects genuine business process requirements
- Module evolution aligns with business logic evolution

This alignment between aggregate boundaries and module boundaries ensures that the technical architecture supports business requirements while maintaining the loose coupling principles essential for sustainable modular systems.



## Bounded Contexts

All behavioral concepts exist within **Bounded Contexts** - specific business areas that contain business processes and define meaning, actors, and workflows.

**Context Definition**: A bounded context establishes:

- What entities mean within that business area
- The actors involved in operations
- The business processes and their lifecycles
- The vocabulary and terminology used

**Context Boundaries**: The same entity name in different contexts often represents different entities with distinct meanings and behaviors.

**Pivotal Events**: Bounded contexts communicate through **pivotal events** - significant business outcomes that mark context boundaries and trigger processes in other contexts.

**Example Context Violation**: A single "Order" aggregate handling both customer purchases and supplier procurement represents different business concepts that should be modeled separately.

**Process-Oriented Contexts**: Map contexts to business processes rather than data entities:

- Lead Acquisition Process (Marketing context)
- Opportunity Management Process (Sales context)
- Service Delivery Process (Customer context)

**Multi-Context Entities**: The same entity type may exist in different aggregates across different contexts, provided the lifecycle parts are disjointed and don't require simultaneous transactional changes.

**Context Integration**: Bounded contexts communicate through pivotal events representing meaningful business outcomes, preserving context autonomy while enabling system coordination.

**Design Reality**: Finding appropriate context boundaries is an iterative process that requires experimentation and refinement. Initial boundaries often need adjustment as understanding of business processes deepens through modeling and implementation experience.

Bounded contexts provide the scope within which behavioral specifications maintain consistent meaning, ensuring meta-language precision serves coherent business purposes.


