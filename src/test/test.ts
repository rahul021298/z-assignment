// test/test.js

const { expect } = require('chai');
import { Checkout, pricingRules } from '../app';

describe('Checkout System', () => {
    //positive test cases
    it('handles empty cart', () => {
        const co = new Checkout(pricingRules);
        expect(co.total()).to.equal(0);
    });

    it('calculates total cost for Apple TVs with "3 for 2" deal', () => {
        const co = new Checkout(pricingRules);
        co.scan('atv', 3);
        co.scan('vga');
        expect(co.total()).to.equal(249);
    });

    it('calculates total cost for bulk discounted applied on ipads', () => {
        const co = new Checkout(pricingRules);
        co.scan('atv', 2);
        co.scan('ipd', 5);
        expect(co.total()).to.equal(2718.95);
    });

    it('handles product without pricing rule', () => {
        const co = new Checkout(pricingRules);
        co.scan('mbp');
        co.scan('vga');
        expect(co.total()).to.equal(1429.99);
    });

    //negative test cases
    it('handles invalid quantity for product scan', () => {
        const co = new Checkout(pricingRules);
        co.scan('atv', -1);
        expect(co.total()).to.equal(0);
    });

    it('handles invalid product scan', () => {
        const co = new Checkout(pricingRules);
        co.scan('invalidProduct');
        expect(co.total()).to.equal(0);
    });
});
