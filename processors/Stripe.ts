import {
  APIKeyCredentials,
  CardDetails,
  ParsedAuthorizationResponse,
  ParsedCancelResponse,
  ParsedCaptureResponse,
  ProcessorConnection,
  RawAuthorizationRequest,
  RawCancelRequest,
  RawCaptureRequest,
} from '@primer-io/app-framework';

import Stripe from 'stripe';

const StripeConnection: ProcessorConnection<APIKeyCredentials, CardDetails> = {
  name: 'STRIPE',

  website: 'stripe.com',

  async authorize(
    request: RawAuthorizationRequest<APIKeyCredentials, CardDetails>,
  ): Promise<ParsedAuthorizationResponse> {
    /**
     * Using the Stripe library and the information in the request
     * You should authorize a transaction and return an appropriate response
     */
    throw new Error('Method Not Implemented');
  },

  capture(
    request: RawCaptureRequest<APIKeyCredentials>,
  ): Promise<ParsedCaptureResponse> {
    /**
     * This method should capture the funds on an authorized transaction
     */
    throw new Error('Method Not Implemented');
  },

  cancel(
    request: RawCancelRequest<APIKeyCredentials>,
  ): Promise<ParsedCancelResponse> {
    /**
     * Finally: this ones should cancel an authorized transaction
     */
    throw new Error('Method Not Implemented');
  },
};

export default StripeConnection;
