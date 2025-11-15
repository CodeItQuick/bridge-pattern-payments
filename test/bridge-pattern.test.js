'use strict';

import { expect, test } from 'vitest'
import {
    Payment,
    PaypalGateway,
    StripeGateway
} from '../domain/oneTimePayment.js'

test('can charge a stripe single user for a one-time payment of $120', () => {
    const stripeGateway = new StripeGateway();

    stripeGateway.oneTimePayment();

    expect(stripeGateway.amountSubscriptionPaid()).toStrictEqual(120)
    expect(stripeGateway.totalMonthsPaid()).toStrictEqual(12)
})
test('can charge a stripe single user for there first month subscription for $10', () => {
    const stripeGateway = new StripeGateway();

    stripeGateway.payMonth();

    expect(stripeGateway.amountSubscriptionPaid()).toStrictEqual(10)
    expect(stripeGateway.totalMonthsPaid()).toStrictEqual(1)
})
test('can charge a stripe single user for there second month subscription for $10, and knows the total subscription cost', () => {
    const stripeGateway = new StripeGateway();
    stripeGateway.payMonth();

    stripeGateway.payMonth();

    expect(stripeGateway.amountSubscriptionPaid()).toStrictEqual(20)
    expect(stripeGateway.totalMonthsPaid()).toStrictEqual(2)
})
test('can charge a paypal single user for a one-time payment of $120', () => {
    const paypalGateway = new PaypalGateway();

    paypalGateway.oneTimePayment();

    expect(paypalGateway.amountSubscriptionPaid()).toStrictEqual(120)
    expect(paypalGateway.totalMonthsPaid()).toStrictEqual(12)
})
test('can charge a paypal single user for there first month subscription for $10', () => {
    const paypalGateway = new PaypalGateway();

    paypalGateway.payMonth();

    expect(paypalGateway.amountSubscriptionPaid()).toStrictEqual(10)
    expect(paypalGateway.totalMonthsPaid()).toStrictEqual(1)
})
test('can charge a paypal single user for there second month subscription for $10, and knows the total subscription cost', () => {
    const paypalGateway = new PaypalGateway();
    paypalGateway.payMonth();

    paypalGateway.payMonth();

    expect(paypalGateway.amountSubscriptionPaid()).toStrictEqual(20)
    expect(paypalGateway.totalMonthsPaid()).toStrictEqual(2)
})
test('can charge a single user through an abstract interface', () => {
    const paypalGateway = new PaypalGateway();
    let customerList = {
        'cust_1': ['oneTime', 'paypal']
    };
    const payment = new Payment([
        { name: 'paypal', gateway: paypalGateway }], customerList);

    payment.pay('cust_1');

    expect(payment.totalPaid()).toStrictEqual(120)
})
test('can charge two users through an abstract interface', () => {
    const paypalGateway = new PaypalGateway();
    let customerList = {
        'cust_1': ['oneTime', 'paypal'],
        'cust_2': ['oneTime', 'paypal']
    };
    const payment = new Payment([
        { name: 'paypal', gateway: paypalGateway }], customerList);

    payment.pay('cust_1');
    payment.pay('cust_2');

    expect(payment.totalPaid()).toStrictEqual(240)
})
test('can charge two users on different platforms through an abstract interface', () => {
    const paypalGateway = new PaypalGateway();
    const stripeGateway = new StripeGateway();
    let customerList = {
        'cust_1': ['oneTime', 'paypal'],
        'cust_2': ['oneTime', 'stripe']
    };
    const payment = new Payment([
        { name: 'paypal', gateway: paypalGateway },
        { name: 'stripe', gateway: stripeGateway }], customerList);

    payment.pay('cust_1');
    payment.pay('cust_2');

    expect(payment.totalPaid()).toStrictEqual(240)
})
test('can charge two users for monthly subscriptions on different platforms through an abstract interface', () => {
    const paypalGateway = new PaypalGateway();
    const stripeGateway = new StripeGateway();
    let customerList = {
        'cust_1': ['monthly', 'paypal'],
        'cust_2': ['oneTime', 'stripe']
    };
    const payment = new Payment([
        { name: 'paypal', gateway: paypalGateway },
        { name: 'stripe', gateway: stripeGateway }
    ], customerList);

    payment.pay('cust_1');
    payment.pay('cust_2');

    expect(payment.totalPaid()).toStrictEqual(130)
})