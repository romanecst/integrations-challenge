import {
  ConnectionDescriptor,
  ParsedAuthorizationResponse,
  ParsedCancelResponse,
  ParsedCaptureResponse,
  RawAuthorizationRequest,
  RawCancelRequest,
  RawCaptureRequest,
} from '@primer-io/app-framework';

import Stripe from 'stripe';

const STRIPE_API_KEY = 'sk_test_cFVHWj6yQNIOIqglbxBUoM9n00O3HP0G6J';
const STRIPE_ACCOUNT_ID = 'my-account-id';

const StripeConnection: ConnectionDescriptor = {
  connection: {
    name: 'STRIPE',

    website: 'stripe.com',

    async authorize(
      request: RawAuthorizationRequest,
    ): Promise<ParsedAuthorizationResponse> {
      const stripe = new Stripe(request.processorApiKey, {
        apiVersion: '2020-08-27',
      });

      const stripeResponse = await stripe.paymentIntents.create({
        amount: request.amount,
        currency: request.currencyCode,
      });

      return {
        transactionStatus: 'AUTHORIZED',
        processorTransactionId: stripeResponse.id,
      };
    },

    capture(request: RawCaptureRequest): Promise<ParsedCaptureResponse> {
      throw new Error('Method Not Implemented');
    },

    cancel(request: RawCancelRequest): Promise<ParsedCancelResponse> {
      throw new Error('Method Not Implemented');
    },
  },

  requestExamples: {
    auth: () => ({
      amount: 100,
      currencyCode: 'GBP',
      processorAccountId: STRIPE_ACCOUNT_ID,
      processorApiKey: STRIPE_API_KEY,
      cardDetails: {
        expiryMonth: 4,
        expiryYear: 2022,
        cardholderName: 'Mr Jamie MacLeod',
        cvv: '020',
        cardNumber: '4111111111111111',
      },
    }),
    capture: (data) => ({
      processorAccountId: STRIPE_ACCOUNT_ID,
      processorApiKey: STRIPE_API_KEY,
      processorTransactionId: data.processorTransactionId,
    }),
    cancel: (data) => ({
      processorAccountId: STRIPE_ACCOUNT_ID,
      processorApiKey: STRIPE_API_KEY,
      processorTransactionId: data.processorTransactionId,
    }),
  },
};

export default StripeConnection;
