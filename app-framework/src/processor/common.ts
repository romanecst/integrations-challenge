enum TransactionStatus {
  Authorized = "AUTHORIZED",
  Declined = "DECLINED",
  Failed = "FAILED",
  Settling = "SETTLING",
  Settled = "SETTLED",
  Cancelled = "CANCELLED",
}

enum DeclineReason {
  DoNotHonor = "DO_NOT_HONOR",
  InsufficientFunds = "INSUFFICIENT_FUNDS",
  Unknown = "UNKNOWN",
}

export { TransactionStatus, DeclineReason };
