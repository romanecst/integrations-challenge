import {
  ClientIDSecretCredentials,
  ParsedAuthorizationResponse,
  ParsedCaptureResponse,
  PayPalOrder,
  ProcessorConnection,
  RawAuthorizationRequest,
  RawCancelRequest,
  RawCaptureRequest,
} from '@primer-io/app-framework';
import HTTPClient from './HTTPClient';

const PayPalConnection: ProcessorConnection<
  ClientIDSecretCredentials,
  PayPalOrder
> = {
  name: 'PAYPAL',

  website: 'https://paypal.com',

  authorize(
    request: RawAuthorizationRequest<ClientIDSecretCredentials, PayPalOrder>,
  ): Promise<ParsedAuthorizationResponse> {
    /**
     * Use the HTTPClient and the request info to authorize a paypal order
     */
    throw new Error('Not Implemented');
  },

  capture(
    request: RawCaptureRequest<ClientIDSecretCredentials>,
  ): Promise<ParsedCaptureResponse> {
    /**
     * The exercise doesn't require you to complete this one
     * but have a go at it if you like ;)
     */
    throw new Error('Not Implemented');
  },

  cancel(
    request: RawCancelRequest<ClientIDSecretCredentials>,
  ): Promise<ParsedCaptureResponse> {
    /**
     * Use the HTTPClient and the request information to cancel the PayPal order
     */
    throw new Error('Not Implemented');
  },
};

export default PayPalConnection;
