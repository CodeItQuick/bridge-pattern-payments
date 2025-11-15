
export class Payment {
    constructor(paymentProviders, customerList) {
        this.paymentProviders = paymentProviders;
        this.customerList = customerList;
    }
    pay(customer) {
        const [paymentSchedule, gatewayName] = this.customerList[customer];
        const gateway = this.paymentProviders.find(x => x.name === gatewayName).gateway;
        if (paymentSchedule === 'oneTime') {
            gateway.oneTimePayment()
        }
        if (paymentSchedule === 'monthly') {
            gateway.payMonth();
        }

    }

    totalPaid() {
        let totalPaid = 0;
        for (const [_, providerName] of Object.values(this.customerList)) {
            const gateway = this.paymentProviders.find(x => x.name === providerName).gateway;
            totalPaid += gateway.amountSubscriptionPaid();
        }
        return totalPaid;
    }
}

export class StripeGateway {
    monthsPaid = 0;
    amountPaid = 0;
    oneTimePayment() {
        this.monthsPaid = 12;
        this.amountPaid = 120;
    }
    amountSubscriptionPaid() {
        return this.amountPaid;
    }
    totalMonthsPaid() {
        return this.monthsPaid;
    }
    payMonth() {
        this.monthsPaid += 1;
        this.amountPaid += 10;
    }
}
export class PaypalGateway {
    monthsPaid = 0;
    amountPaid = 0;
    oneTimePayment() {
        this.monthsPaid = 12;
        this.amountPaid = 120;
    }
    amountSubscriptionPaid() {
        return this.amountPaid;
    }
    totalMonthsPaid() {
        return this.monthsPaid;
    }
    payMonth() {
        this.monthsPaid += 1;
        this.amountPaid += 10;
    }
}