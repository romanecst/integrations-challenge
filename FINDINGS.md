# Primer Checkout Challenge Findings

1. Transaction Lifecycle

The first step of the challenge was researching the transaction lifecycle to get an understanding of how to implement the authorisation and cancellation processes correctly.

First an order is created with a specified amount and currency. 
After the client enters their details and confirms the payment, their account is checked to verify they have sufficient funds. If this is the case the payment is authorised and the amount is marked as pending on the client's account and the client can no longer use this fund.

During that time the payment authorisation can be cancelled. If so, the funds will be available again for the client to use.

Once the payment has been authorised, it can be captured by the merchant. The payment will then be completed and the funds will be removed from the client's account and added to the merchant's account.

2. PayPal API

On the client side, using the PayPal client SDK, an order can be created, specifying the purchase units and amount. The currency of the order is specified in a query-string parameter when the SDK is loaded in the `script` tag in `setup.js`.

Once the client approves the transaction the `onApprove` method calls the `authorize` method from `PayPal.ts` with the order ID via the POST `/authorize` route in `server.ts`. This method sends a request to the PayPal Orders API with the order ID to authorise the payment for that order. If the autorisation is successfull (status code 201) the transaction status is set to 'AUTHORIZED' if it is unsuccessful the transaction status is set to 'FAILED'.

Once the payment is authorised the client can click the cancel button to cancel the payment which calls the `cancel` method from `PayPal.ts` via the POST `/cancel` route in `server.ts`. This method sends a request to the PayPal Orders API with the order authorisation ID to cancel or void the authorisation. If the cancellation is successful (status code 204)  the transaction status is set to 'CANCELLED'.

3. TypeScript

One of the main challenges was using TypeScript and the type system for the first time . 
Using the types and interfaces defined in `index.d.ts` I could deduce how to access and use the variables that compose the requests in `Paypal.ts`
