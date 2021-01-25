import { TransactionStatus, DeclineReason } from "./common";

type RawCancelRequest = {
  processorTransactionId: string;
  processorAccountId: string;
  processorApiKey: string;
  merchantReference?: string;
};

type ParsedCancelResponse = {
  transactionStatus: TransactionStatus;
  declineReason?: DeclineReason;
  errorMessage?: string;
};

export { RawCancelRequest, ParsedCancelResponse };
