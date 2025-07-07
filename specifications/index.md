---
title: Specifications
layout: layout.njk
---

# Specifications

## Structured Behavioral Descriptions

Ubi uses structured YAML specifications to capture behavioral requirements with precision. These specifications generate business documentation, acceptance criteria in Given-When-Then format, and technical artifacts, ensuring consistency from collaborative modeling to implementation.

## Specification-Driven Development

The framework employs a comprehensive specification-driven approach across architectural layers:

**Lifecycle Specifications → Core Layer**: Generate business documentation, Given-When-Then scenarios, and executable decider implementations with comprehensive test suites.

**Policy Specifications → Policy Layer**: Generate business documentation for reactive rules and Policy layer implementations that handle event-driven automation.

**Process Specifications → Orchestration Layer**: Generate business process documentation and Orchestrator services that coordinate complex workflows across aggregates and bounded contexts.

This approach ensures consistent behavioral specification fidelity from individual operations through complete distributed processes.

## Operation Specifications

Operations describe state transitions using a structured format that captures business rules, preconditions, and expected outcomes.

### Operation Format

```yaml
operation: <OperationName>
description: <Business description of the operation>

given_that:
  - <Guard1>
  - <Guard2>
  
when: <Command>

and:
  - <Precondition1>
  - <Precondition2>
  
then:
  - <CommonEvent1>
  - <CommonEvent2>
  
andOutcome:
  - <Assertion1>
  - <Assertion2>
  
branches:
  - and:
      - <BranchingLogic1>
      - <BranchingLogic2>
    then: <BranchEvent1>
    andOutcome:
      - <BranchAssertion1>
      - <BranchAssertion2>
      
  - and:
      - <BranchingLogic3>
    then: <BranchEvent2>
    andOutcome:
      - <BranchAssertion3>
```

### Basic Operation Example

```yaml
operation: PlaceOrder
description: Customer places an order for available items

given_that:
  - Customer is authenticated
  - Customer has valid payment method
  
when: PlaceOrder

and:
  - Items are in stock
  - Order total is under credit limit
  
then:
  - OrderPlaced
  
andOutcome:
  - Order status is "confirmed"
  - Customer receives order confirmation
  - Order total matches cart total
```

### Operation with Branching Logic

```yaml
operation: ProcessPayment
description: Process customer payment with different outcomes based on amount

given_that:
  - Customer is authenticated
  - Payment method is valid
  
when: ProcessPayment

and:
  - Payment amount is positive
  - Sufficient funds available
  
then:
  - PaymentProcessed
  
andOutcome:
  - Payment status is "completed"
  - Customer account is charged
  
branches:
  - and:
      - Payment amount > 1000
    then: HighValuePaymentFlagged
    andOutcome:
      - Risk assessment is triggered
      - Additional verification required
      
  - and:
      - Customer is premium member
    then: PremiumPaymentProcessed
    andOutcome:
      - Premium rewards are applied
      - Priority support is enabled
```

### Complex Operation Example

```yaml
operation: ApproveCredit
description: Credit manager approves or rejects credit application

given_that:
  - User has credit_manager role
  - Application is in pending status
  
when: ApproveCredit

and:
  - Credit score is available
  - Income verification is complete
  - Identity verification is complete
  
then:
  - CreditDecisionMade
  
andOutcome:
  - Application status is updated
  - Decision timestamp is recorded
  - Decision maker is tracked
  
branches:
  - and:
      - Credit score >= 700
      - Income >= 50000
    then: CreditApproved
    andOutcome:
      - Credit limit is assigned
      - Customer receives approval notification
      - Account activation process begins
      
  - and:
      - Credit score < 700
    then: CreditRejected
    andOutcome:
      - Rejection reason is documented
      - Customer receives rejection notification
      - Reapplication eligibility date is set
      
  - and:
      - Credit score >= 600
      - Income >= 75000
    then: CreditApprovedWithConditions
    andOutcome:
      - Reduced credit limit is assigned
      - Special terms are applied
      - Monitoring requirements are activated
```

## Policy Specifications

Policies describe reactive business rules that trigger commands in response to events.

### Policy Format

```yaml
policy: <PolicyName>
description: <Business description of the policy>

whenever: <TriggerEvent>

and:
  - <Condition1>
  - <Condition2>

then: <ResultingCommand>

andOutcome:
  - <Assertion1>
  - <Assertion2>
```

### Basic Policy Example

```yaml
policy: OrderInventoryCheck
description: Automatically check inventory when order is placed

whenever: OrderPlaced

then: CheckInventory

andOutcome:
  - Inventory verification is initiated
  - Stock levels are validated
  - Availability status is updated
```

### Conditional Policy Example

```yaml
policy: HighValueOrderReview
description: Flag high-value orders for manual review

whenever: OrderPlaced

and:
  - Order total > 5000
  - Customer account age < 30 days

then: FlagForManualReview

andOutcome:
  - Order is marked for review
  - Review team is notified
  - Customer receives processing notification
```

## Process Specifications

Processes describe complex workflows that compose multiple operations and policies.

### Synthetic Process Format

```yaml
process: <ProcessName>
description: <Business description of the process>

when: <InitialCommand>

then:
  - <ResultEvent1>
  - <ResultEvent2>
  - <ResultEvent3>

andOutcome:
  - <ProcessAssertion1>
  - <ProcessAssertion2>
```

### Detailed Process Format

```yaml
process: <ProcessName>
description: <Business description of the process>

steps:
  - operation: <OperationName1>
    triggers: <Event1>
    
  - policy: <PolicyName1>
    whenever: <Event1>
    then: <Command1>
    
  - operation: <OperationName2>
    when: <Command1>
    triggers: <Event2>

finalOutcome:
  - <FinalAssertion1>
  - <FinalAssertion2>
```

### Synthetic Process Format

```yaml
process: OrderFulfillment
description: Complete order processing from placement to delivery

when: PlaceOrder

then:
  - OrderConfirmed
  - PaymentProcessed
  - ItemsShipped
  - CustomerNotified

andOutcome:
  - Order is completely fulfilled
  - Customer receives products
  - Payment is collected
  - Delivery is confirmed
```

### Detailed Process Format

```yaml
process: CustomerOnboarding
description: Complete customer registration and setup process

steps:
  - operation: RegisterCustomer
    triggers: CustomerRegistered
    
  - policy: SendWelcomeEmail
    whenever: CustomerRegistered
    then: SendWelcomeMessage
    
  - operation: VerifyEmail
    when: ConfirmEmail
    triggers: EmailVerified
    
  - policy: ActivateAccount
    whenever: EmailVerified
    then: EnableCustomerAccess
    
  - operation: CompleteProfile
    when: UpdateProfile
    triggers: ProfileCompleted

finalOutcome:
  - Customer account is active
  - Profile is complete
  - Access is enabled
  - Welcome sequence is finished
```

## Lifecycle Specifications

Lifecycle specifications describe the complete behavior of an aggregate through a collection of operation specifications, defining all possible state transitions and business invariants.

### Lifecycle Format

```yaml
lifecycle: <AggregateName>
description: <Business description of the aggregate lifecycle>

operations:
  - when: <Command1>
    and:
      - <Precondition1>
      - <Precondition2>
    branches:
      - then:
          - <Event1>
        andOutcome:
          - <Assertion1>
          - <Assertion2>
      - and:
          - <BranchingLogic>
        then:
          - <BranchEvent>
        andOutcome:
          - <BranchAssertion>

  - when: <Command2>
    and:
      - <Precondition3>
    branches:
      - then:
          - <Event2>
        andOutcome:
          - <Assertion3>

invariants:
  - <BusinessRule1>
  - <BusinessRule2>
  - <BusinessRule3>
```

### Lifecycle Example

```yaml
lifecycle: Cart
description: Shopping cart lifecycle managing product selection and ordering

operations:
  - when: create-cart
    and:
      - cart does not already exist
    branches:
      - then:
          - cart-created
        andOutcome:
          - cart status is empty
          - cart has an empty product list
          - cart total price is 0

  - when: add-product
    and:
      - cart exists
      - product does not already exist in cart
      - product quantity is greater than 0
      - cart status is either empty or active
    branches:
      - then:
          - product-added
        andOutcome:
          - product is added to the cart
          - cart status is active if at least one product exists
          - cart total price is updated with the product's price * quantity
      - and:
          - cart status is empty
        then:
          - cart-activated
        andOutcome:
          - cart status is active

  - when: remove-product
    and:
      - cart exists
      - product exists in the cart
      - cart status is active
      - product quantity is greater than 0
    branches:
      - then:
          - product-removed
        andOutcome:
          - product is removed from the cart
          - cart status remains active if there are still products in the cart
          - cart total price is decreased by the product's price * quantity
      - and:
          - cart is now empty
        then:
          - cart-emptied
        andOutcome:
          - cart status is empty
          - cart total price is 0

  - when: cancel-cart
    and:
      - cart exists
      - cart status is active
    branches:
      - then:
          - cart-cancelled
        andOutcome:
          - cart status is cancelled
          - cart total price remains unchanged

  - when: confirm-cart
    and:
      - cart exists
      - cart status is active
    branches:
      - then:
          - cart-confirmed
        andOutcome:
          - cart status is confirmed
          - cart total price remains unchanged

  - when: add-product-quantity
    and:
      - cart exists
      - cart is active
      - product exists in the cart
      - quantity added is greater than 0
    branches:
      - then:
          - product-quantity-added
        andOutcome:
          - product quantity is updated
          - cart total price is updated with the new product's price * new quantity
          
  - when: remove-product-quantity
    and:
      - cart exists
      - cart is active
      - product exists in the cart
      - quantity removed is greater than 0
      - quantity removed is less than or equal to current product quantity
    branches:
      - then:
          - product-quantity-removed
        andOutcome:
          - product quantity is decreased
          - cart total price is decreased by the product's price * quantity removed

invariants:
  - Cart total price should be 0 when empty
  - Cart should have an empty product list when status is 'empty'
  - Cart should have a positive total price when active
  - Cart should have products when status is 'active'
  - Cart should not contain products with zero or negative quantities
  - Cart should not contain negative priced products
  - Cart status should not be 'cancelled' or 'confirmed' while adding or removing products
  - Cart status should remain 'cancelled' after cancellation
  - Cart status should remain 'confirmed' after confirmation
  - Total price should be calculated as the sum of product price * quantity
```

## Generated Outputs

These YAML specifications automatically generate:

**Business Documentation**: Human-readable process descriptions and business rules **Acceptance Criteria**: Given-When-Then test scenarios for validation **API Specifications**: Interface definitions based on commands, queries, and events **Test Scenarios**: Automated test cases covering success and failure paths

## Specification Benefits

**Business Alignment**: YAML format is readable by both technical and business stakeholders **Precision**: Structured format eliminates ambiguity in behavioral descriptions  
**Traceability**: Direct connection between specifications and all generated artifacts **Consistency**: Standardized format ensures uniform descriptions across projects **Automation**: Specifications drive code generation, testing, and documentation

Specifications serve as the authoritative source of business intent that flows consistently through all framework components and generated artifacts.



## Executable Specification Format

Executable specifications transform descriptive business rules into testable assertions that validate decider implementation.

### Executable Operation Format

typescript

```typescript
- when: <Command>
  and:
    - description: <Business rule description>
      assertion: (dm) => <TypeScript assertion on Decision Model>
      failureCode: <Error code for failed precondition>
      
  branches:
    - description: <Branch condition description>
      assertion: (dm) => <TypeScript condition evaluation>
      then:
        - <Event>
      andOutcome:
        - description: <Outcome description>
          assertion: (om) => <TypeScript assertion on Outcome Model>
```

### Executable Specification Example

typescript

```typescript
- when: create-cart
  and:
    - description: Cart does not already exist
      assertion: (dm) => dm.state === undefined
      failureCode: cart_already_exists

  branches:
    - description: Always
      assertion: (dm) => true
      then:
        - cart-created
      andOutcome:
        - description: emits `cart-created`
          assertion: |
            (om) => {
              const cartCreatedEvt = om.evts.find(e => e.type === 'cart-created');
              expect(cartCreatedEvt).toBeDefined();
            }
        - description: new state.status is `empty`
          assertion: (om) => expect(om.state.status).toBe('empty')
        - description: cart total price is 0
          assertion: (om) => expect(om.state.totalPrice).toBe(0)

- when: add-product
  and:
    - description: Cart exists
      assertion: (dm) => dm.state !== undefined
      failureCode: cart_does_not_exist

    - description: Product does not already exist in cart
      assertion: (dm) => !dm.state.products.find(p => p.id === dm.cmd.data.productId)
      failureCode: product_already_in_cart

    - description: Product quantity is greater than 0
      assertion: (dm) => dm.cmd.data.quantity > 0
      failureCode: invalid_quantity

    - description: Cart status is either empty or active
      assertion: (dm) => ['empty', 'active'].includes(dm.state.status)
      failureCode: cart_not_available

  branches:
    - description: Always
      assertion: (dm) => true
      then:
        - product-added
      andOutcome:
        - description: emits `product-added`
          assertion: (om) => expect(om.evts.find(e => e.type === 'product-added')).toBeDefined()
        - description: product is added to the cart
          assertion: (om) => expect(om.state.products).toContainEqual(
            expect.objectContaining({ id: dm.cmd.data.productId })
          )
        - description: cart total price is updated
          assertion: (om) => expect(om.state.totalPrice).toBeGreaterThan(0)

    - description: Cart status was empty
      assertion: (dm) => dm.state.status === 'empty'
      then:
        - cart-activated
      andOutcome:
        - description: emits `cart-activated`
          assertion: |
            (om) => {
              const cartActivatedEvt = om.evts.find(e => e.type === 'cart-activated');
              expect(cartActivatedEvt).toBeDefined();
            }
        - description: cart status is active
          assertion: (om) => expect(om.state.status).toBe('active')

- when: confirm-cart
  and:
    - description: Cart exists
      assertion: (dm) => dm.state !== undefined
      failureCode: cart_does_not_exist

    - description: Cart status is active
      assertion: (dm) => dm.state.status === 'active'
      failureCode: cart_not_active

  branches:
    - description: Always
      assertion: (dm) => true
      then:
        - cart-confirmed
      andOutcome:
        - description: emits `cart-confirmed`
          assertion: (om) => expect(om.evts[0]?.type).toBe('cart-confirmed')
        - description: cart status is confirmed
          assertion: (om) => expect(om.state.status).toBe('confirmed')
        - description: cart total price remains unchanged
          assertion: (om) => expect(om.state.totalPrice).toBe(dm.state.totalPrice)
```

### Executable Invariants

typescript

```typescript
- invariants:
  - appliesTo:
      - EmptyCart
    description: Cart total price should be 0 when empty
    assertion: (state) => expect(state.totalPrice).toBe(0)

  - appliesTo:
      - EmptyCart
    description: Cart should have an empty product list when status is 'empty'
    assertion: (state) => expect(state.products).toHaveLength(0)

  - appliesTo:
      - ActiveCart
    description: Cart should have a positive total price when active
    assertion: (state) => expect(state.totalPrice).toBeGreaterThan(0)

  - appliesTo:
      - ActiveCart
    description: Cart should have products when status is 'active'
    assertion: (state) => expect(state.products.length).toBeGreaterThan(0)

  - appliesTo: all
    description: Cart should not contain products with zero or negative quantities
    assertion: (state) => 
      state.products.forEach(product => 
        expect(product.quantity).toBeGreaterThan(0)
      )

  - appliesTo: all
    description: Total price should be calculated as the sum of product price * quantity
    assertion: (state) => {
      const calculatedTotal = state.products.reduce(
        (sum, product) => sum + (product.price * product.quantity), 0
      );
      expect(state.totalPrice).toBe(calculatedTotal);
    }
```

### Generation Process

1. **Descriptive to Executable**: AI toolkit transforms descriptive specifications into executable format by adding programmatic assertions
2. **Test Generation**: Executable specifications generate comprehensive test suites that validate decider implementation
3. **Implementation Validation**: Tests ensure that business rules are correctly implemented in the decider pattern
4. **Regression Protection**: Executable specifications prevent behavioral regressions during code changes