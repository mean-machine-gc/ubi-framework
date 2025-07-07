---
title: Architecture
layout: layout.njk
---

# Architecture

___


## Opinionated Patterns for Behavioral Implementation

The Ubi architecture provides an opinionated approach to implementing software systems that directly support the meta-language concepts while maintaining clear separation of concerns. The architecture facilitates seamless flow from behavioral specifications to running code through predictable, testable patterns.

## Architectural Overview

### Layered Separation of Concerns

The Ubi architecture organizes systems into three primary layers:

**Application Layer**: Manages external interfaces, protocol handling, and system integration concerns.

**Domain Layer**: Contains pure business logic implementing behavioral specifications without infrastructure dependencies.

**Infrastructure Layer**: Handles technical concerns including persistence, messaging, external service integration, and platform-specific implementations.

This separation ensures that business logic remains independent of technical implementation details, enabling both comprehensive testing and evolutionary architecture practices.

### Domain Layer Structure

The domain layer follows an opinionated three-component pattern that directly supports behavioral specification implementation:

**Inbox**: Processes incoming commands and retrieves current state required for business operations.

**Core (Decider)**: Implements behavioral specifications as pure functions that evaluate business rules and determine outcomes.

**Outbox**: Handles operation results by persisting state changes and publishing events to external systems.

This structure creates a predictable flow that maps directly to the meta-language concepts while maintaining functional programming principles and comprehensive testability.

## Core (Decider) Layer

The Core layer implements the **Decider Pattern** - a functional approach to business logic that transforms behavioral specifications into executable, testable code. The decider operates as a pure function that processes business operations without side effects.

### Decider Function Signature

Each business operation executes as a function with clearly defined inputs and outputs:

```
Decider: Decision Model → Outcome Model
```

**Decision Model** (Input): Combines the incoming command with current aggregate state, providing all information necessary for business rule evaluation.

**Outcome Model** (Output): Contains an array of events representing business outcomes and the resulting state after operation completion.

### Two-Phase Execution

The decider implements business operations through two distinct phases that directly correspond to meta-language behavioral specifications:

#### Decision Phase

The Decision phase evaluates business rules and determines operation outcomes:

1. **Precondition Evaluation**: Validates business rules required for operation success
    - If preconditions fail: Returns failure events with specific reasons for each failed rule
    - If preconditions pass: Proceeds to branching logic evaluation
2. **Branching Logic Evaluation**: Determines which events to produce based on business conditions
    - Evaluates branching conditions from behavioral specifications
    - Selects appropriate event combinations based on business context
    - Returns success events array representing the business outcome

The Decision phase produces an events array and the current state, without modifying state directly.

#### Evolution Phase

The Evolution phase transforms state based on the events determined during the Decision phase:

- **Success Path**: Applies the Evolve function to each event in sequence, transforming state progressively
- **Failure Path**: Bypassed entirely when preconditions fail, leaving state unchanged

The Evolve function handles individual events, applying state transformations that reflect the business meaning of each event.

### Behavioral Specification Mapping

The decider pattern directly implements meta-language behavioral specifications:

```
Given that <Guards>,
When <Command>,
And <Preconditions>,
Then <Common Events>,
Branch [And <Branching Logic>, And <Additional Events>]
```

**Implementation Mapping**:

- **Guards**: Handled at Application or Inbox layer for access control
- **Command**: Input to Decision Model along with current state
- **Preconditions**: Evaluated in Decision phase, determining success or failure path
- **Common Events + Branching Logic**: Determined in Decision phase based on business rules
- **State Evolution**: Applied in Evolution phase through Evolve function

### Predictable Failure Handling

The decider pattern provides standardized failure management through the meta-language structure:

**Precondition Failures**: Generate specific failure events that identify exactly which business rules were not satisfied. The Evolution phase is bypassed, ensuring failed operations never corrupt aggregate state.

**Success Variations**: Branching logic produces different event combinations based on business conditions, enabling complex business behavior while maintaining predictable outcomes.

### Key Advantages

**Pure Function Implementation**: The decider operates without side effects, making business logic entirely predictable and testable in isolation.

**Behavioral Specification Fidelity**: Business rules from collaborative modeling translate directly into decider logic without interpretation overhead.

**Comprehensive Testability**: Both success and failure scenarios can be tested through simple function calls with known inputs and expected outputs.

**Time Travel Capability**: The Evolve function can be used independently to reconstruct aggregate state from historical events, supporting debugging, auditing, and analytical requirements.

**Infrastructure Independence**: Business logic contains no infrastructure concerns, enabling testing without databases, message queues, or external services.

### CQRS and Functional Patterns

The decider pattern naturally supports Command Query Responsibility Segregation (CQRS) and functional programming approaches:

**Command Processing**: Handled through the decider's Decision and Evolution phases **Query Processing**: Supported through separate read models built from published events **Functional Composition**: Decider functions can be composed and tested independently **Event Sourcing Compatibility**: The Evolve function provides the foundation for event sourcing implementations

The Core (Decider) layer serves as the foundation for implementing behavioral specifications with precision, testability, and maintainability. It transforms the meta-language concepts into executable business logic while preserving the clarity and traceability established during collaborative modeling sessions.



## Inbox Layer

The Inbox layer orchestrates the transformation of external commands into Decision Models suitable for Core processing. It manages the complex coordination required to hydrate business operations with all necessary context while maintaining clear separation from pure business logic.

### Inbox Process Architecture

The Inbox implements a **composable step pipeline** that systematically prepares commands for business rule evaluation:

```
External Command + Infrastructure Dependencies → Decision Model → Core Execution
```

This pipeline approach enables flexible command processing that adapts to different aggregate requirements while maintaining consistent patterns across the system.

### Step Pipeline Execution

The Inbox processes commands through a series of configurable steps designed to build complete Decision Models:

#### 1. Command Reception

Receives external commands from the Application layer along with infrastructure dependencies including:

- Repository interfaces for state retrieval
- External module clients for cross-boundary coordination
- Distributed tracing and logging capabilities
- Security context and authorization information

#### 2. Guard Evaluation

Evaluates access control and security guards before proceeding with expensive operations:

- Authentication and authorization validation
- Resource access permissions
- Security policy compliance
- Early termination for unauthorized requests

Failed guard evaluation bypasses subsequent steps and Core execution, preventing unauthorized operations while minimizing system load.

#### 3. Idempotency Management

Implements command deduplication strategies appropriate for each aggregate:

- Command fingerprinting and duplicate detection
- Idempotency key validation
- Previous execution result retrieval when applicable
- Configurable idempotency policies per operation type

#### 4. State Hydration

Retrieves current aggregate state required for business rule evaluation:

- Primary aggregate state loading
- Related entity state retrieval
- State consistency validation
- Optimistic concurrency control preparation

#### 5. Command Enrichment

Coordinates with external modules and services to build complete business context:

- Cross-module data retrieval through service clients
- External system integration for additional context
- Business rule input preparation
- Command transformation and standardization

#### 6. Decision Model Assembly

Combines enriched command with current state to create the complete Decision Model required by the Core layer.

#### 7. Core Execution

Invokes the Decider with the prepared Decision Model and handles the resulting Outcome Model.

### Composable Step Architecture

Each step in the pipeline operates as an independent, composable function that can be:

- **Configured per aggregate**: Different aggregates require different enrichment and validation steps
- **Tested in isolation**: Individual steps can be unit tested with known inputs and expected outputs
- **Monitored independently**: Each step generates observability data for performance and failure analysis
- **Extended dynamically**: New cross-cutting concerns can be added as pipeline steps

### Error Handling and Resilience

The Inbox implements comprehensive error handling that maintains system reliability:

**Step-Level Error Tracking**: Failed operations include specific information about which pipeline step encountered the error, enabling precise debugging and targeted remediation.

**Async Operation Resilience**: External service calls implement automatic retry policies with exponential backoff before failing, reducing transient failure impact.

**Graceful Degradation**: Non-critical enrichment failures can be handled without aborting the entire operation, allowing business operations to proceed with available information.

**Error Context Preservation**: Failure information includes complete execution context for effective troubleshooting and system monitoring.

### Meta-Language Observability

The Inbox leverages distributed tracing to create observability that directly maps to behavioral specifications:

**Nested Span Structure**:

- **Guard Evaluation Span**: Corresponds to "Given that" clauses in specifications
- **Command Processing Span**: Maps to "When" command handling
- **Core Execution Span**: Represents "Then" business rule evaluation
- **Individual Step Spans**: Provide granular visibility into each pipeline operation

This observability structure enables business stakeholders to understand system execution because traces follow the same meta-language format used in behavioral specifications.

**Traceability Benefits**:

- Performance bottlenecks are immediately visible at the specification level
- Business rule execution can be traced from command input to event output
- Failed operations show exactly which specification component failed
- System behavior aligns with collaborative modeling artifacts

### Integration with Reactive Processing

The Inbox supports both synchronous command processing and integration with reactive event-driven workflows:

**Direct Command Processing**: External commands processed through the complete pipeline for immediate business operation execution.

**Policy Integration**: Separate Policy components can trigger Inbox processing in response to subscribed events, enabling reactive business process automation while reusing the same command processing infrastructure.

This dual approach maintains consistency in how commands are processed regardless of their trigger source, whether direct user action or automated business rule reaction.

The Inbox layer transforms external commands into precisely prepared Decision Models while maintaining comprehensive observability, error handling, and flexibility. It serves as the critical bridge between external system interfaces and pure business logic, ensuring that Core operations receive complete, validated context for reliable business rule evaluation.


## Policy Layer

The Policy layer implements reactive business automation by translating published events into command executions. It embodies the meta-language Policy concept - "Whenever <Event>, Then <Command>" - as executable infrastructure that enables automated business process flows.

### Policy Architecture

Policies operate as **event-driven command orchestrators** that maintain business rule automation while preserving the same processing guarantees as direct command execution:

```
Subscribed Events → Policy Evaluation → Command Generation → Inbox Processing
```

This architecture ensures that automated business reactions follow the same rigorous processing pipeline as user-initiated commands, maintaining consistency in business rule evaluation and system behavior.

### Policy Component Structure

Each Policy component implements a focused reactive capability:

**Event Subscription Management**: Maintains subscriptions to specific published events from source contexts or aggregates.

**Business Rule Evaluation**: Determines whether subscribed events should trigger automated actions based on business conditions.

**Command Generation**: Creates appropriate commands for Inbox processing when policy conditions are satisfied.

**Error Handling**: Manages policy execution failures and retry logic for reliable automation.

### Policy Execution Flow

#### 1. Event Reception

Policies receive published events through the messaging infrastructure, including:

- Event payload with business data
- Event metadata including source context and timestamp
- Correlation identifiers for process tracing
- Event versioning information for compatibility management

#### 2. Policy Condition Evaluation

Evaluates business conditions to determine whether the event should trigger automated action:

- Business rule validation against event content
- State dependency checks when required
- Timing and sequencing considerations
- External system availability assessment

#### 3. Command Construction

When policy conditions are satisfied, constructs appropriate commands for business operation execution:

- Command payload assembly from event data
- Command routing to appropriate aggregate contexts
- Priority and urgency designation
- Correlation context preservation for traceability

#### 4. Inbox Integration

Delegates command processing to the Inbox layer, ensuring automated commands receive the same treatment as user-initiated commands:

- Complete pipeline processing including guards, enrichment, and validation
- Full observability and error handling capabilities
- Consistent business rule evaluation through Core execution
- Standardized outcome processing through Outbox layer

### Policy Types and Patterns

**Immediate Reaction Policies**: Trigger commands immediately upon event reception for time-sensitive business automation.

**Conditional Policies**: Evaluate complex business conditions before triggering commands, potentially consulting additional state or external systems.

**Aggregating Policies**: Collect multiple related events before triggering commands, implementing business rules that require event correlation or batching.

**Compensating Policies**: Implement business compensation logic by triggering corrective actions in response to failure or rollback events.

### Distributed Policy Management

Policies can be deployed and managed at different architectural levels:

**Co-located Policies**: Deployed within the same module as their target aggregates for low-latency automation with strong consistency guarantees.

**Distributed Policies**: Deployed as separate services for cross-module automation, enabling business process coordination across bounded contexts.

**Saga Coordination Policies**: Implement distributed workflow coordination by managing multi-step business processes across module boundaries.

### Observability and Debugging

Policy execution leverages the same observability infrastructure as the Inbox layer:

**Event-to-Command Tracing**: Distributed traces connect subscribed events through policy evaluation to resulting command execution.

**Policy Decision Logging**: Business rule evaluation results are logged for policy behavior analysis and debugging.

**Automation Metrics**: Policy execution frequency, success rates, and performance metrics enable automation reliability monitoring.

**Business Process Visibility**: End-to-end process traces show complete automated workflows from triggering events to final outcomes.

### Error Handling and Reliability

**Retry Mechanisms**: Failed policy executions implement exponential backoff retry with configurable limits.

**Dead Letter Handling**: Events that repeatedly fail policy processing are routed to dead letter queues for manual investigation.

**Circuit Breaker Protection**: Policies implement circuit breaker patterns to prevent cascading failures when downstream systems are unavailable.

**Compensation Integration**: Policy failures can trigger compensating actions to maintain business process integrity.

### Integration with Meta-Language Specifications

Policy implementations directly reflect collaborative modeling artifacts:

**EventStorming Purple Stickies**: Physical policy stickies from modeling sessions translate directly into Policy component implementations.

**Behavioral Specifications**: Policy conditions and command generation logic implement the business rules captured during domain modeling.

**Process Flow Maintenance**: Policies ensure that business process flows identified during collaborative sessions execute reliably in production systems.

The Policy layer enables sophisticated business automation while maintaining the precision, testability, and observability established by the Core and Inbox layers. It transforms reactive business rules into reliable system behavior that preserves business intent across distributed operations.



## Outbox Layer

The Outbox layer handles the reliable persistence and publication of business operation outcomes. It ensures that state changes and event notifications are consistently applied across internal and external system boundaries while maintaining transactional guarantees and system reliability.

### Outbox Responsibilities

The Outbox processes the Outcome Model from Core execution through several coordinated activities:

**State Management**: Handles aggregate state persistence with support for both traditional state storage and event sourcing patterns.

**Event Classification**: Distinguishes between internal events for module coordination and external events for cross-context integration.

**Event Enrichment**: Transforms business events into standardized formats suitable for external consumption.

**Reliable Publishing**: Ensures consistent delivery of events to appropriate messaging infrastructure using transactional patterns.

### Dual Event Processing

The Outbox implements sophisticated event handling that supports both internal coordination and external integration:

#### Internal Event Processing

**Internal Events** facilitate coordination within module boundaries and immediate contexts:

- Published to **internal event bus** for intra-module policy activation
- Maintain high-performance, low-latency delivery for responsive automation
- Preserve detailed business context appropriate for internal processing
- Enable immediate reactive processing within the same deployment boundary

#### External Event Processing

**External Events** enable integration across bounded contexts and system boundaries:

- **Event Enrichment**: Transform business events into standardized formats with additional context
- **CloudEvents Format**: Publish external events using CloudEvents specification for interoperability
- **Cross-Context Integration**: Enable communication between bounded contexts while preserving autonomy
- **External System Compatibility**: Provide standardized event formats for third-party system integration

### Outbox Pattern Implementation

The Outbox implements the **Transactional Outbox Pattern** to ensure consistency between state changes and event publication:

#### Traditional State Persistence Mode

When operating in standard state persistence mode:

1. **Atomic Transaction**: State changes and outbox event records are written in a single database transaction
2. **Event Publishing**: Background process reads outbox records and publishes events to messaging infrastructure
3. **Delivery Confirmation**: Successfully published events are marked as delivered in the outbox
4. **Retry Logic**: Failed event publications are retried with exponential backoff until successful delivery

#### Event Sourcing Mode

When operating in event sourcing mode:

1. **Event Stream Persistence**: Events are written directly to the event stream as the source of truth
2. **State Reconstruction**: Aggregate state is derived from event stream when needed
3. **Event Publishing**: Events are published to messaging infrastructure from the same stream
4. **Consistency Guarantee**: Single event stream ensures perfect consistency between state and published events

### Event Enrichment Pipeline

External events undergo systematic enrichment before publication:

#### Context Addition

- Source aggregate and bounded context identification
- Timestamp and sequence information for ordering
- Correlation identifiers for distributed tracing
- Schema version information for compatibility management

#### CloudEvents Standardization

- **Event Type**: Standardized event type classification
- **Event Source**: Canonical source identification for event consumers
- **Event Data**: Business payload in appropriate schema format
- **Event Metadata**: Additional context required for external processing

#### Integration Metadata

- Routing information for message broker delivery
- Consumer compatibility indicators
- Event priority and delivery requirements
- Security and authorization context when required

### Reliability and Error Handling

The Outbox implements comprehensive reliability patterns:

**Transactional Consistency**: State changes and event publication decisions are made atomically to prevent inconsistent system state.

**Delivery Guarantees**: Events are published with at-least-once delivery semantics, ensuring business outcomes are communicated reliably.

**Failure Isolation**: Event publication failures do not affect state persistence, maintaining aggregate consistency while enabling eventual event delivery.

**Retry Mechanisms**: Failed event publications implement exponential backoff with circuit breaker protection to prevent system overload.

**Dead Letter Handling**: Events that repeatedly fail publication are routed to dead letter queues for manual investigation and potential reprocessing.

### Observability and Monitoring

The Outbox continues the distributed tracing established in Inbox and Core layers:

**Event Publication Tracing**: Each event publication creates trace spans that connect business operations to external system integration.

**Performance Monitoring**: Event publication latency and throughput metrics enable infrastructure optimization.

**Delivery Confirmation**: Event delivery status is tracked and exposed through monitoring systems for operational visibility.

**Business Process Completion**: End-to-end traces show complete business operation execution from command input through event delivery.

### Integration Patterns

The Outbox supports multiple integration approaches:

**Message Broker Integration**: Direct publication to enterprise message brokers with appropriate routing and delivery semantics.

**Event Stream Publishing**: Integration with event streaming platforms for high-throughput, ordered event delivery.

**API Webhook Delivery**: Direct HTTP delivery to external systems that prefer synchronous event notification.

**Batch Processing**: Accumulation and batch delivery of events for systems that prefer bulk processing patterns.

### Configuration and Flexibility

**Deployment Modes**: Configurable operation in either state persistence or event sourcing mode based on aggregate requirements.

**Event Classification Rules**: Flexible configuration of which events are internal versus external based on business context.

**Enrichment Policies**: Configurable event enrichment rules that adapt to different external system requirements.

**Delivery Strategies**: Pluggable delivery mechanisms that support different messaging infrastructure and integration patterns.

The Outbox layer ensures that business operation outcomes are reliably communicated across system boundaries while maintaining the transactional guarantees and observability established throughout the architecture. It completes the behavioral specification execution cycle by transforming Core decisions into persistent state changes and distributed event notifications.


## Supporting Platform Infrastructure

The core architectural layers require supporting infrastructure to operate effectively in distributed production environments. These platform capabilities address the operational complexity inherent in modular systems while maintaining the behavioral specification fidelity established in the domain layers.

### API Documentation and Discovery

Effective modular systems require comprehensive API documentation and discovery mechanisms that reflect the behavioral specifications driving system design.

#### API Specification Standards

**OpenAPI Specifications**: Document synchronous API interfaces including command endpoints and query operations, providing machine-readable contracts that support code generation and testing automation.

**AsyncAPI Specifications**: Document asynchronous event interfaces including published events and subscription patterns, enabling integration planning and compatibility validation.

#### API Registry and Catalog

**Event Catalogue Integration**: Publish API specifications and event schemas to centralized registries like Event Catalogue, providing organization-wide visibility into available interfaces and integration points.

**Schema Evolution Management**: Track API and event schema versions, enabling controlled evolution of interfaces while maintaining backward compatibility for existing consumers.

**Cross-Context Discovery**: Enable teams to discover and understand interfaces across bounded contexts, supporting informed integration decisions and reducing duplication.

### Distributed Application Runtime

Distributed systems introduce significant complexity in cross-service communication, state management, and operational concerns. Distributed application runtimes abstract common patterns and infrastructure management requirements.

#### DAPR Integration Benefits

**Service-to-Service Communication**: Abstracts service discovery, load balancing, and retry policies, enabling reliable inter-module communication without infrastructure-specific code.

**State Management**: Provides consistent state store interfaces that support both traditional persistence and event sourcing patterns across different storage technologies.

**Publish/Subscribe Messaging**: Abstracts message broker complexities, enabling reliable event publishing and subscription management across different messaging infrastructures.

**Secrets Management**: Centralized secret retrieval and rotation capabilities that integrate with enterprise secret management systems.

**Observability Integration**: Built-in distributed tracing, metrics collection, and logging that complement the meta-language observability established in the domain layers.

**Configuration Management**: External configuration management that supports environment-specific settings without application code changes.

These capabilities reduce the infrastructure complexity burden on development teams while providing enterprise-grade reliability and operational support.

### Platform Engineering and Deployment

Modern distributed systems require sophisticated deployment and operational capabilities that extend beyond traditional infrastructure management.

#### Deployment Complexity Management

**Infrastructure Abstraction**: Platform engineering practices abstract deployment complexity, enabling development teams to focus on business logic rather than infrastructure concerns.

**Environment Consistency**: Standardized deployment patterns ensure consistent behavior across development, testing, and production environments.

**Scaling and Resource Management**: Automated scaling policies and resource allocation based on application requirements rather than infrastructure constraints.

#### Radius Platform Integration

**DAPR-Native Deployment**: Radius provides deployment and management capabilities specifically designed for DAPR-based applications, simplifying the operational overhead of distributed application runtimes.

**Application-Centric Management**: Focus on application requirements and relationships rather than low-level infrastructure details, aligning operational concerns with business functionality.

**Environment Provisioning**: Automated provisioning of complete application environments including all required infrastructure dependencies and configurations.

**Developer Experience**: Simplified deployment workflows that reduce the complexity barrier for teams adopting distributed system patterns.

### Application and Component Catalog

Effective modular system development requires comprehensive cataloging of available software modules and components to enable composition and reuse.

#### Module Discovery and Reuse

**Component Registry**: Centralized catalog of available software modules with their capabilities, interfaces, and integration requirements clearly documented.

**Behavioral Specification Integration**: Module catalog entries include behavioral specifications and usage examples that align with the meta-language concepts used throughout the system.

**Dependency Management**: Clear documentation of module dependencies and compatibility requirements, enabling informed composition decisions.

**Version and Lifecycle Management**: Track module versions, deprecation schedules, and migration paths to support systematic system evolution.

#### Composition Support

**Interface Compatibility**: Automated validation of module interface compatibility to prevent integration issues during system composition.

**Configuration Templates**: Reusable configuration patterns for common module composition scenarios, reducing integration complexity and setup time.

**Best Practice Documentation**: Capture and share effective module composition patterns and architectural decisions across development teams.

These supporting platform capabilities transform the sophisticated architectural patterns of the core layers into operationally viable distributed systems. They address the practical concerns of API management, infrastructure complexity, deployment automation, and component reuse that determine success in production environments.

The combination of behavioral specification-driven architecture with robust platform infrastructure creates systems that maintain business intent clarity while meeting enterprise operational requirements.