import {
  ParsedAuthorizationResponse,
  ParsedCancelResponse,
  ParsedCaptureResponse,
} from '@primer-io/app-framework';
import StripeConnection from './Stripe';

const STRIPE_API_KEY = 'sk_test_cFVHWj6yQNIOIqglbxBUoM9n00O3HP0G6J';
const STRIPE_ACCOUNT_ID = 'my-account-id';

(async () => {
  console.log('\n=== TEST: authorization ===');
  await testAuthTransaction();
  console.log('\n=== TEST: capture ===');
  await testCaptureTransaction();
  console.log('\n=== TEST: cancel ===');
  await testCancelTransaction();
})();

async function testAuthTransaction(): Promise<ParsedAuthorizationResponse> {
  console.log(`Authorizing payment using "${StripeConnection.name}"`);

  let response: ParsedAuthorizationResponse | null = null;

  try {
    response = await StripeConnection.authorize({
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
    });
  } catch (e) {
    console.error('Error while authorizing transaction:');
    console.error(e);
    process.exit(1);
  }

  console.log(
    `Authorization request complete: "${response.transactionStatus}"`,
  );

  if (response.transactionStatus === 'FAILED') {
    console.log(`Authorization Request failed: ${response.errorMessage}`);
    process.exit(1);
  }

  if (response.transactionStatus === 'DECLINED') {
    console.log(`Authorization was declined: ${response.declineReason}`);
    process.exit(1);
  }

  return response;
}

async function testCancelTransaction(): Promise<void> {
  const authResponse = await testAuthTransaction();

  console.log('Cancelling authorized payment...');

  if (authResponse.transactionStatus !== 'AUTHORIZED') {
    console.error('Transaction must be AUTHORIZED inn order to cancel it');
    process.exit(1);
  }

  let response: ParsedCancelResponse | null = null;

  try {
    response = await StripeConnection.cancel({
      processorAccountId: STRIPE_ACCOUNT_ID,
      processorTransactionId: authResponse.processorTransactionId,
      processorCredentials: {
        apiKey: STRIPE_API_KEY,
      },
    });
  } catch (e) {
    console.error('Error while cancelling transaction:');
    console.error(e);
    process.exit(1);
  }

  if (response.transactionStatus !== 'CANCELLED') {
    console.error(
      `Expected transaction status to be "CANCELLED" but received "${response.transactionStatus}"`,
    );
  }
}

async function testCaptureTransaction(): Promise<void> {
  const authResponse = await testAuthTransaction();

  console.log('Capturing authorized payment...');

  if (authResponse.transactionStatus !== 'AUTHORIZED') {
    console.error('Transaction must be AUTHORIZED inn order to capture it');
    process.exit(1);
  }

  let response: ParsedCaptureResponse | null = null;

  try {
    response = await StripeConnection.capture({
      processorAccountId: STRIPE_ACCOUNT_ID,
      processorTransactionId: authResponse.processorTransactionId,
      processorCredentials: {
        apiKey: STRIPE_API_KEY,
      },
    });
  } catch (e) {
    console.error('Error while capturing transaction:');
    console.error(e);
    process.exit(1);
  }

  if (response.transactionStatus !== 'SETTLED') {
    console.error(
      `Expected transaction status to be "SETTLED" but received "${response.transactionStatus}"`,
    );
  }
}
