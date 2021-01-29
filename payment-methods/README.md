# Payment Methods

For this exercise you'll be implementing a Processor connection using PayPal's REST API and also tackling some of the client side implementation on the web.

We've provided you with a `clientID` and `clientSecret` Key for our paypal sandbox account.

Take a look in `PayPal.ts`, you'll find the interface for the PayPal processor. We'd like you to implement the `authorize` and `cancel` methods. These should send requests to the PayPal API.

The client side code can be found in `client.js`. there's a function called `renderPayPalButton`, you should check out PayPal's documentation and find out how to create a paypal order here. Once you've created the order: pass the `orderID` to `authorizePayment(...)`

To run the program use the following command:

```bash
yarn start:payment-methods
```