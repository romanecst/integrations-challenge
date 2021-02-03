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

/**
 * Use the HTTP Client to make requests to PayPal's orders API
 */
import HTTPClient from '../common/HTTPClient';

require('dotenv').config();


const PayPalConnection: ProcessorConnection<
  ClientIDSecretCredentials,
  PayPalOrder
> = {
  name: 'PAYPAL',

  website: 'https://paypal.com',

  configuration: {
    accountId: process.env.ACCOUNT_ID || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
  },

  /**
   * Authorize a PayPal order
   * Use the HTTPClient and the request info to authorize a paypal order
   */
  authorize(
    request: RawAuthorizationRequest<ClientIDSecretCredentials, PayPalOrder>,
  ): Promise<ParsedAuthorizationResponse> {

    //encode the clientId and clientSecret in base64 as per the HTTP basic access authentication protocol
    const auth: string = Buffer.from(request.processorConfig.clientId + ":" + request.processorConfig.clientSecret).toString("base64");
    
    /** 
     * request to the paypal orders API to authorise the order in progress
     * if the authorisation is successful (status code 201) the transaction status is set to 'AUTHORIZED' and the processor transcation ID is stored
     * if the authorisation fails the transaction status is set to 'FAILED' and the error message stores the reason of the failure
     */
    return new Promise<ParsedAuthorizationResponse>((resolve, reject) => {
      HTTPClient.request(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${request.paymentMethod.orderId}/authorize`, 
      {method: 'post', 
      headers: 
      {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        intent: "AUTHORIZE",
        purchase_units: [
          {
            amount: {
              currency_code: request.currencyCode,
              value: request.amount
            }
          }
        ]
      })
    })
    .then(response => {
      if(response.statusCode === 201){
        resolve({
          processorTransactionId: JSON.parse(response.responseText).purchase_units[0].payments.authorizations[0].id,
          transactionStatus: 'AUTHORIZED'
        });
      }else{
        resolve({
          errorMessage: JSON.parse(response.responseText),
          transactionStatus: 'FAILED'
        });
      }
    })
    .catch(error => {
      reject({
        errorMessage: error,
        transactionStatus: 'FAILED'
      });
    });
  });
  },

  /**
   * Cancel a PayPal order
   * Use the HTTPClient and the request information to cancel the PayPal order
   */
  cancel(
    request: RawCancelRequest<ClientIDSecretCredentials>,
  ): Promise<ParsedCaptureResponse> {
    
    const auth: string = Buffer.from(request.processorConfig.clientId + ":" + request.processorConfig.clientSecret).toString("base64");
   /** 
     * request to the paypal API to void the authorised order
     * if cancellation is successful (status code 204) the transaction status is set to 'CANCELLED'
     * if the cancellation fails the error message stores the reason of the failure
     */
    return new Promise<ParsedCaptureResponse>((resolve, reject) => {
      HTTPClient.request(`https://api-m.sandbox.paypal.com/v2/payments/authorizations/${request.processorTransactionId}/void`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`
        },
        body: ""
      })
      .then(response => {
        if (response.statusCode === 204){
          resolve({
            transactionStatus: 'CANCELLED'
          });
        }
      })
      .catch(error => {
        reject({
          errorMessage: error
        })
      });
    })
  },

  /**
   * Capture a PayPal order (You can ignore this method for the exercise)
   */
  capture(
    request: RawCaptureRequest<ClientIDSecretCredentials>,
  ): Promise<ParsedCaptureResponse> {
    throw new Error('Not Implemented');
  },
};

export default PayPalConnection;
