# z-assignment
# Checkout System

## Introduction
This is a checkout system implementation for a computer store.

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the solution: `npm start`.

## Code Structure
- `app.ts`: Contains the Checkout class and its methods.
- `constants.ts`: Contains interfaces and product pricing rules.

## Pricing Rules
- Implemented "3 for 2" deal on Apple TVs.
- Applied bulk discount for the Super iPad.

## Example Usage
```typescript

const co1 = new Checkout(pricingRules);
co1.scan('atv', 3);
co1.scan('vga');
co1.total();

const co2 = new Checkout(pricingRules);
co2.scan('atv', 2);
co2.scan('ipd', 5);
co2.total();
