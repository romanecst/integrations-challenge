import { TransactionStatus, DeclineReason } from "./common";

class RawAuthorizationRequest {
  amount: bigint;
  currencyCode: string;
  processorAccountId: string;
  processorApiKey: string;
  merchantReference?: string;

  constructor(
    amount: bigint,
    currencyCode: string,
    processorAccountId: string,
    processorApiKey: string,
    merchantReference?: string
  ) {
    this.amount = amount;
    this.currencyCode = currencyCode;
    this.processorAccountId = processorAccountId;
    this.processorApiKey = processorApiKey;
    this.merchantReference = merchantReference;
  }
}

class ParsedAuthorizationResponse {
  transactionStatus: TransactionStatus;
  declineReason?: DeclineReason;
  errorMessage?: string;
  processorTransactionId?: string;

  constructor(
    transactionStatus: TransactionStatus,
    declineReason?: DeclineReason,
    errorMessage?: string,
    processorTransactionId?: string
  ) {
    this.transactionStatus = transactionStatus;
    this.declineReason = declineReason;
    this.errorMessage = errorMessage;
    this.processorTransactionId = processorTransactionId;
  }
}

export { RawAuthorizationRequest, ParsedAuthorizationResponse };
