---
title: Specifications
layout: layout.njk
---

# Business Logic as Code

## Structured Behavioral Specifications

Ubi transforms business requirements into executable code through structured YAML specifications that capture behavioral requirements with precision. These specifications generate business documentation, acceptance criteria in Given-When-Then format, and technical artifacts, ensuring consistency from collaborative modeling to implementation.

## Specification-Driven Development

The framework employs a comprehensive specification-driven approach where business logic becomes executable code:

**Lifecycle Specifications (ubi.lifecycle.yaml)**: Define aggregate behavior, state transitions, and business rules that generate complete implementation including types, business logic, and comprehensive test suites.

**Assertion Specifications (ubi.assertions.yaml)**: Transform lifecycle business rules into executable implementation specifications with precise validation logic and failure handling.

**Policy Specifications (ubi.policies.yaml)** *(under development)*: Define reactive business rules and event-driven automation that handle cross-aggregate coordination and business process automation.

**Saga Specifications (ubi.saga.yaml)** *(under development)*: Describe complex multi-aggregate workflows and cross-module processes that coordinate distributed business operations.

This approach ensures that business logic is captured as precise, executable specifications that maintain fidelity from individual operations through complete distributed processes.

## Aggregate Lifecycle Specifications

Lifecycle specifications describe the complete behavior of business aggregates through structured operation definitions, capturing all possible state transitions and business invariants.

### Lifecycle Format

```yaml
aggregate: <AggregateName>
version: 1.0.0
description: <Business description of the aggregate>

operations:
  - name: <OperationName>
    description: <Business description of the operation>
    guards:
      - <Guard1>
      - <Guard2>
    when: <command-name>
    preconditions:
      - <precondition_1>
      - <precondition_2>
    branches:
      - condition: <branching_condition>
        then: <event-name>
        andOutcome:
          - <outcome_assertion_1>
          - <outcome_assertion_2>
```

### Basic Lifecycle Example

```yaml
aggregate: User
version: 1.0.0
description: Manages user registration, authentication, and lifecycle

operations:
  - name: CreateUser
    description: Creates a new user account
    guards:
      - user_is_authenticated
    when: create-user
    preconditions:
      - user_does_not_exist
      - email_is_available
      - email_is_valid
      - password_meets_requirements
      - terms_accepted
    branches:
      - condition: user_data_is_complete
        then: user-created
        andOutcome:
          - user_state_is_active
          - user_id_is_generated
          - user_email_matches_command
          - password_is_hashed_and_stored

  - name: UpdateUser
    description: Updates user information
    guards:
      - user_is_authenticated
      - user_owns_account
    when: update-user
    preconditions:
      - user_exists
      - user_is_active
      - update_data_is_provided
    branches:
      - condition: update_data_is_valid
        then: user-updated
        andOutcome:
          - user_state_is_updated
          - profile_reflects_command_updates
          - unchanged_fields_preserved
```

## Implementation Assertions

Assertion specifications transform lifecycle business rules into executable implementation specifications, bridging the gap between business intent and technical implementation.

### Assertion Format

```yaml
aggregate: <AggregateName>
version: 1.0.0

guards:
  <guard_name>: "<async implementation expression>"

preconditions:
  <precondition_name>: "<pure function expression>"

branching_conditions:
  <condition_name>: "<decision logic expression>"

outcome_assertions:
  <assertion_name>:
    assert: "<validation expression>"
    description: "<human readable description>"
```

### Assertion Example

```yaml
aggregate: User
version: 1.0.0

guards:
  user_is_authenticated: "await authService.verifyToken(cmd.metadata.token)"
  user_owns_account: "await authService.checkOwnership(cmd.payload.userId, authContext.userId)"

preconditions:
  user_does_not_exist: "state === null"
  email_is_valid: "isValidEmail(cmd.payload.email)"
  password_meets_requirements: "isValidPassword(cmd.payload.password)"
  terms_accepted: "cmd.payload.termsAccepted === true"

branching_conditions:
  user_data_is_complete: "hasCompleteName(cmd.payload.profile)"
  always: "true"

outcome_assertions:
  user_state_is_active:
    assert: "state.status === 'active'"
    description: "User status must be set to active"
  user_id_is_generated:
    assert: "state.id && typeof state.id === 'string' && state.id.length > 0"
    description: "User ID must be generated and non-empty"
  password_is_hashed_and_stored:
    assert: "state.passwordHash && state.passwordHash !== cmd.data.password && isBcryptHash(state.passwordHash)"
    description: "Password must be hashed (not plain text) and stored"
```

## Policy Specifications *(Under Development)*

Policies describe reactive business rules that trigger commands in response to events, enabling event-driven automation and cross-aggregate coordination.

### Policy Format *(Preview)*

```yaml
policy: <PolicyName>
description: <Business description of the policy>

whenever: <TriggerEvent>

and:
  - <condition_1>
  - <condition_2>

then: <resulting_command>

andOutcome:
  - <assertion_1>
  - <assertion_2>
```

### Policy Example *(Preview)*

```yaml
policy: OrderInventoryCheck
description: Automatically check inventory when order is placed

whenever: OrderPlaced

and:
  - order_total_above_threshold
  - customer_is_new

then: FlagForManualReview

andOutcome:
  - review_task_is_created
  - customer_receives_notification
  - order_status_is_pending_review
```

## Saga Specifications *(Under Development)*

Sagas describe complex multi-aggregate workflows that coordinate distributed business operations across module boundaries.

### Saga Format *(Preview)*

```yaml
saga: <SagaName>
description: <Business description of the process>

when: <initial_command>

steps:
  - operation: <operation_name>
    triggers: <event_name>
  - policy: <policy_name>
    whenever: <event_name>
    then: <command_name>

finalOutcome:
  - <final_assertion_1>
  - <final_assertion_2>
```

### Saga Example *(Preview)*

```yaml
saga: OrderFulfillment
description: Complete order processing from placement to delivery

when: PlaceOrder

steps:
  - operation: ValidateOrder
    triggers: OrderValidated
  - policy: ProcessPayment
    whenever: OrderValidated
    then: ProcessPayment
  - operation: FulfillOrder
    triggers: PaymentProcessed

finalOutcome:
  - order_is_completely_fulfilled
  - customer_receives_products
  - payment_is_collected
```

## Generated Implementation

These YAML specifications automatically generate complete, production-ready implementations:

**TypeScript Types**: Complete type definitions with validation patterns and business rule constraints

**Business Logic**: Executable decider implementations that enforce all business rules and state transitions

**Test Suites**: Comprehensive test coverage including success scenarios, failure cases, and edge conditions

**API Documentation**: Interface definitions based on commands, queries, and events

**Business Documentation**: Human-readable process descriptions and Given-When-Then acceptance criteria

## Business Logic Benefits

**Executable Specifications**: Business rules become runnable code that can be tested and validated

**Single Source of Truth**: Specifications drive all implementation artifacts, ensuring consistency

**Business Alignment**: YAML format is readable by both technical and business stakeholders

**Precision**: Structured format eliminates ambiguity in behavioral descriptions

**Traceability**: Direct connection between business intent and technical implementation

**Quality Assurance**: Automated generation ensures comprehensive test coverage and type safety

**Maintainability**: Changes to business rules propagate consistently through all implementation layers

Business logic as code transforms the traditional gap between business requirements and technical implementation into a seamless, automated process where business intent drives executable reality.

## Specification Architecture

The Ubi Framework employs a layered specification architecture that mirrors the system's implementation layers:

**Core Layer (ubi.lifecycle.yaml + ubi.assertions.yaml)**: Individual aggregate behavior with complete business rule enforcement and state management

**Policy Layer (ubi.policies.yaml)**: Event-driven automation and reactive business rules that coordinate between aggregates

**Orchestration Layer (ubi.saga.yaml)**: Complex multi-aggregate workflows and distributed process coordination

This architectural alignment ensures that specifications maintain behavioral fidelity from individual operations through complete distributed business processes, enabling true business logic as executable code.