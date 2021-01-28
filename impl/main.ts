import { TransactionInfo } from '@primer-io/app-framework';
import StripeConnection from './Stripe';

(async () => {
  /**
   * Create anm auth request and perform an authorization
   */
  const { requestExamples, connection } = StripeConnection;

  const authRequest = requestExamples.auth();
  const authResponse = await connection.authorize(authRequest);

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

  /**
   * Uncomment the following lines to capture
   */
  // const captureRequest = requestExamples.capture(transactionInfo);
  // const captureResponse = await connection.capture(captureRequest);

  /**
   * Uncomment the following lines to cancel
   */
  // const cancelRequest = requestExamples.cancel(transactionInfo);
  // const cancelResponse = await connection.cancel(cancelRequest);
})();
