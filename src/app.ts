import { PRODUCTS, PricingRule } from "./constants";

export class Checkout {
    private pricingRules: Record<string, PricingRule>;
    private scannedItems = new Map<string, number>();

    constructor(pricingRules: Record<string, PricingRule>) {
        this.pricingRules = pricingRules;
        this.scannedItems = new Map();
    }

    scan(skuId: string, quantity: number = 1): void {
        this.scannedItems.set(skuId, (this.scannedItems.get(skuId) || 0) + quantity);
    }

    private calculateItemPrice(skuId: string, quantity: number): number {
        const price = this.pricingRules[skuId]?.price || 0;
        const discountFunction = this.pricingRules[skuId]?.discountFunction;
    
        if (discountFunction) {
            return discountFunction(price, quantity);
        } else {
          return price * quantity;
        }
    }

    total(): number {
        let totalCost = 0;
        this.scannedItems.forEach((quantity, skuId) => {
            if (quantity > 0) {
                const price = this.calculateItemPrice(skuId, quantity);
                totalCost += price;
            }
        });
        console.log(`Total Price: $${totalCost}`);
        return totalCost;
    }
}


export const pricingRules: Record<string, PricingRule> = {
    atv: {
        price: PRODUCTS.atv.price,
        discountFunction: (price, quantity) => Math.floor(quantity / 3) * 2 * price + (quantity % 3) * price,
    },
    ipd: {
        price: PRODUCTS.ipd.price,
        discountFunction: (price, quantity) => (quantity > 4 ? 499.99 : price) * quantity,
    },
    mbp: { price: PRODUCTS.mbp.price },
    vga: { price: PRODUCTS.vga.price },
};

const co1 = new Checkout(pricingRules);
co1.scan('atv', 3);
co1.scan('vga');
co1.total();

const co2 = new Checkout(pricingRules);
co2.scan('atv', 2);
co2.scan('ipd', 5);
co2.total();