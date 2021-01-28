import {
  ParsedAuthorizationResponse,
  ProcessorConnection,
  RawAuthorizationRequest,
} from '@primer-io/app-framework';

import Stripe from 'stripe';

const StripeConnection: ProcessorConnection = {
  name: 'STRIPE',
  website: 'stripe.com',

  async authorize(request) {
    let stripe = new Stripe(request.processorApiKey, {
      apiVersion: '2020-08-27',
    });
    const stripeResponse = await stripe.paymentIntents.create({
      amount: request.amount,
      currency: request.currencyCode,
    });

    let resp: ParsedAuthorizationResponse = {
      transactionStatus: 'AUTHORIZED',
      processorTransactionId: stripeResponse.id,
    };
    return resp;
  },

  capture(request) {
    throw new Error('Method Not Implemented');
  },

  cancel(request) {
    throw new Error('Method Not Implemented');
  },
};

const STRIPE_API_KEY = 'sk_test_cFVHWj6yQNIOIqglbxBUoM9n00O3HP0G6J';

const req: RawAuthorizationRequest = {
  amount: 100,
  currencyCode: 'GBP',
  processorAccountId: 'my-account',
  processorApiKey: STRIPE_API_KEY,
  cardDetails: {
    expiryMonth: 4,
    expiryYear: 2022,
    cardholderName: 'Mr Jamie MacLeod',
    cvv: '020',
    cardNumber: '4111111111111111',
  },
};

(async () => {
  let authResponse = await StripeConnection.authorize(req);
  console.log(authResponse);
})();
