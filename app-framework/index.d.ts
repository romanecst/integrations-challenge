export type TransactionStatus =
  | 'AUTHORIZED'
  | 'DECLINED'
  | 'FAILED'
  | 'SETTLING'
  | 'SETTLED'
  | 'CANCELLED';

export type DeclineReason = 'DO_NOT_HONOR' | 'INSUFFICIENT_FUNDS' | 'UNKNOWN';

export interface RawAuthorizationRequest {
  amount: bigint;
  currencyCode: string;
  processorAccountId: string;
  processorApiKey: string;
  merchantReference?: string;
}

export interface ParsedAuthorizationResponse {
  transactionStatus: TransactionStatus;
  declineReason?: DeclineReason;
  errorMessage?: string;
  processorTransactionId?: string;
}

export interface RawCaptureRequest {
  processorTransactionId: string;
  processorAccountId: string;
  processorApiKey: string;
  merchantReference?: string;
}

export interface ParsedCaptureResponse {
  transactionStatus: TransactionStatus;
  declineReason?: DeclineReason;
  errorMessage?: string;
}

export interface RawCancelRequest {
  processorTransactionId: string;
  processorAccountId: string;
  processorApiKey: string;
  merchantReference?: string;
}

export interface ParsedCancelResponse {
  transactionStatus: TransactionStatus;
  declineReason?: DeclineReason;
  errorMessage?: string;
}

export interface ProcessorConnection {
  name: string;
  website: string;
  authorize(
    rawAuthRequest: RawAuthorizationRequest,
  ): ParsedAuthorizationResponse;
  capture(rawCaptureRequest: RawCaptureRequest): ParsedCaptureResponse;
  cancel(rawCancelRequest: RawCancelRequest): ParsedCancelResponse;
}
