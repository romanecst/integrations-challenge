import {
  APIKeyCredentials,
  CardDetails,
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

const StripeConnection: ConnectionDescriptor<APIKeyCredentials, CardDetails> = {
  connection: {
    name: 'STRIPE',

    website: 'stripe.com',

    async authorize(
      request: RawAuthorizationRequest<APIKeyCredentials, CardDetails>,
    ): Promise<ParsedAuthorizationResponse> {
      const stripe = new Stripe(request.processorCredentials.apiKey, {
        apiVersion: '2020-08-27',
      });

      const token = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: request.paymentMethod.cardNumber,
          exp_month: request.paymentMethod.expiryMonth,
          exp_year: request.paymentMethod.expiryYear,
          cvc: request.paymentMethod.cvv,
        },
      });

      const stripeResponse = await stripe.paymentIntents.create({
        amount: request.amount,
        currency: request.currencyCode,
        payment_method: token.id,
        capture_method: 'manual',
        confirm: true,
      });

      return {
        transactionStatus: 'AUTHORIZED',
        processorTransactionId: stripeResponse.id,
      };
    },

    capture(
      request: RawCaptureRequest<APIKeyCredentials>,
    ): Promise<ParsedCaptureResponse> {
      throw new Error('Method Not Implemented');
    },

    cancel(
      request: RawCancelRequest<APIKeyCredentials>,
    ): Promise<ParsedCancelResponse> {
      throw new Error('Method Not Implemented');
    },
  },

  requestExamples: {
    auth: () => ({
      amount: 100,
      currencyCode: 'GBP',
      processorAccountId: STRIPE_ACCOUNT_ID,
      processorCredentials: {
        apiKey: STRIPE_API_KEY,
      },
      paymentMethod: {
        expiryMonth: 4,
        expiryYear: 2022,
        cardholderName: 'Mr Jamie MacLeod',
        cvv: '020',
        cardNumber: '4111111111111111',
      },
    }),
    capture: (data) => ({
      processorTransactionId: data.processorTransactionId,
      processorAccountId: STRIPE_ACCOUNT_ID,
      processorCredentials: {
        apiKey: STRIPE_API_KEY,
      },
    }),
    cancel: (data) => ({
      processorTransactionId: data.processorTransactionId,
      processorAccountId: STRIPE_ACCOUNT_ID,
      processorCredentials: {
        apiKey: STRIPE_API_KEY,
      },
    }),
  },
};

export default StripeConnection;
