import { ProcessorConnection } from '@primer-io/app-framework';

const StripeConnection: ProcessorConnection = {
  name: 'STRIPE',

  website: 'stripe.com',

  authorize(request) {
    throw new Error('Method Not Implemented');
  },

  capture(request) {
    throw new Error('Method Not Implemented');
  },

  cancel(request) {
    throw new Error('Method Not Implemented');
  },
};

export default StripeConnection;
