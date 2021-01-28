import { TransactionInfo } from '@primer-io/app-framework';
import StripeConnection from './Stripe';

(async () => {
  /**
   * Create anm auth request and perform an authorization
   */
  const { requestExamples, connection } = StripeConnection;

  console.log(`Authorizing payment using "${connection.name}"`);

  const authRequest = requestExamples.auth();
  const authResponse = await connection.authorize(authRequest);

  console.log(
    `Authorization request complete: "${authResponse.transactionStatus}"`,
  );

  if (authResponse.transactionStatus === 'FAILED') {
    console.log(`Authorization Request failed: ${authResponse.errorMessage}`);
    process.exit();
  }

  if (authResponse.transactionStatus === 'DECLINED') {
    console.log(`Authorization was declined: ${authResponse.declineReason}`);
    process.exit();
  }

  /**
   * Now we can either cancel or capture the authorization
   */
  const transactionInfo: TransactionInfo = {
    processorTransactionId: authResponse.processorTransactionId,
  };

  console.log(
    `Processor transaction ID: ${transactionInfo.processorTransactionId}`,
  );

  /**
   * Uncomment the following lines to capture
   */
  // console.log(`Capturing payment using "${connection.name}"`);
  // const captureRequest = requestExamples.capture(transactionInfo);
  // const captureResponse = await connection.capture(captureRequest);
  // console.log(
  //   `Capture request complete "${captureResponse.transactionStatus}"`,
  // );

  /**
   * Uncomment the following lines to cancel
   */
  // console.log(`Cancelling payment using "${connection.name}"`);
  // const cancelRequest = requestExamples.cancel(transactionInfo);
  // const cancelResponse = await connection.cancel(cancelRequest);
  // console.log(`Cancel request complete "${cancelResponse.transactionStatus}"`);
})();
