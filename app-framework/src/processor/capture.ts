import { TransactionStatus, DeclineReason } from "./common";

type RawCaptureRequest = {
  processorTransactionId: string;
  processorAccountId: string;
  processorApiKey: string;
  merchantReference?: string;
};

type ParsedCaptureResponse = {
  transactionStatus: TransactionStatus;
  declineReason?: DeclineReason;
  errorMessage?: string;
};

export { RawCaptureRequest, ParsedCaptureResponse };
