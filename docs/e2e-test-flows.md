# E2E Test Flows for Swag Labs

## High Risk Flows

### Complete Purchase Flow

- **Description**: User logs in, adds items to cart, completes checkout process, and receives order confirmation
- **Risk Level**: High
- **Critical Path**: Login → Browse → Add to Cart → Checkout → Payment → Complete Order

### Product Management

- **Description**: User browses inventory, sorts products, views product details
- **Risk Level**: Medium
- **Actions**: Sort by name/price, view product details, navigate between pages

### Cart Operations

- **Description**: Add/remove items from cart, update quantities, continue shopping
- **Risk Level**: Medium
- **Actions**: Add single/multiple items, remove items, cart persistence
