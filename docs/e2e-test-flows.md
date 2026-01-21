# E2E Test Flows for Swag Labs

## High Risk Flows

### Complete Purchase Flow

- **Description**: User logs in, adds items to cart, completes checkout process, and receives order confirmation
- **Risk Level**: High
- **Critical Path**: Login → Browse → Add to Cart → Checkout → Payment → Complete Order

### User Authentication

- **Description**: Verify different user types can access the system appropriately
- **Risk Level**: High
- **Scenarios**: Valid login, locked user, invalid credentials

## Medium Risk Flows

### Product Management

- **Description**: User browses inventory, sorts products, views product details
- **Risk Level**: Medium
- **Actions**: Sort by name/price, view product details, navigate between pages

### Cart Operations

- **Description**: Add/remove items from cart, update quantities, continue shopping
- **Risk Level**: Medium
- **Actions**: Add single/multiple items, remove items, cart persistence

## Low Risk Flows

### Navigation

- **Description**: Menu navigation, footer links, page routing
- **Risk Level**: Low
- **Actions**: Menu open/close, navigation links, logout

### UI Elements

- **Description**: Verify page elements render correctly
- **Risk Level**: Low
- **Actions**: Page layout, responsive design, element visibility

## Negative Scenarios

### Login Failures

- **Description**: Test various authentication failure scenarios
- **Risk Level**: Medium
- **Scenarios**: Wrong password, locked user, empty fields

### Checkout Validation

- **Description**: Test form validation in checkout process
- **Risk Level**: Medium
- **Scenarios**: Empty required fields, invalid postal codes
