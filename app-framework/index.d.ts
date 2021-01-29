export type TransactionStatus =
  | 'AUTHORIZED'
  | 'DECLINED'
  | 'FAILED'
  | 'SETTLING'
  | 'SETTLED'
  | 'CANCELLED';

export type DeclineReason = 'DO_NOT_HONOR' | 'INSUFFICIENT_FUNDS' | 'UNKNOWN';

export interface CardDetails {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
}

export interface RawAuthorizationRequest {
  amount: number;
  currencyCode: string;
  processorAccountId: string;
  processorApiKey: string;
  cardDetails: CardDetails;
  merchantReference?: string;
}

type IAuthResponse<T, U extends TransactionStatus> = T & {
  transactionStatus: U;
};

export type ParsedAuthorizationResponse =
  | IAuthResponse<
      { processorTransactionId: string },
      'AUTHORIZED' | 'CANCELLED' | 'SETTLING' | 'SETTLED'
    >
  | IAuthResponse<{ declineReason: string }, 'DECLINED'>
  | IAuthResponse<{ errorMessage: string }, 'FAILED'>;

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
  ): Promise<ParsedAuthorizationResponse>;
  capture(rawCaptureRequest: RawCaptureRequest): Promise<ParsedCaptureResponse>;
  cancel(rawCancelRequest: RawCancelRequest): Promise<ParsedCancelResponse>;
}

interface TransactionInfo {
  processorTransactionId: string;
}

export interface ConnectionDescriptor {
  connection: ProcessorConnection;
  requestExamples: {
    auth: () => RawAuthorizationRequest;
    capture: (data: TransactionInfo) => RawCaptureRequest;
    cancel: (data: TransactionInfo) => RawCancelRequest;
  };
}
