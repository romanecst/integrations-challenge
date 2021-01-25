import { ProcessorConnection } from "@primer-io/app-framework";
import {
  RawCancelRequest,
  ParsedCancelResponse,
} from "@primer-io/app-framework/build/processor/cancel";
import {
  RawCaptureRequest,
  ParsedCaptureResponse,
} from "@primer-io/app-framework/build/processor/capture";
import {
  ParsedAuthorizationResponse,
  RawAuthorizationRequest,
} from "@primer-io/app-framework/build/processor/auth";
import {
  DeclineReason,
  TransactionStatus,
} from "@primer-io/app-framework/build/processor/common";


class StripeConnection implements ProcessorConnection {
  capture(rawCaptureRequest: RawCaptureRequest): ParsedCaptureResponse {
    throw new Error("Method not implemented.");
  }
  cancel(rawCancelRequest: RawCancelRequest): ParsedCancelResponse {
    throw new Error("Method not implemented.");
  }
  name = "STRIPE";
  website = "stripe.com";
  authorize(
    rawAuthRequest: RawAuthorizationRequest
  ): ParsedAuthorizationResponse {
    return new ParsedAuthorizationResponse(
      TransactionStatus.Declined,
      DeclineReason.InsufficientFunds
    );
  }
}

export default StripeConnection;
