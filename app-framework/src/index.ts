import {
  ParsedAuthorizationResponse,
  RawAuthorizationRequest,
} from "./processor/auth";
import { ParsedCaptureResponse, RawCaptureRequest } from "./processor/capture";
import { ParsedCancelResponse, RawCancelRequest } from "./processor/cancel";

interface ProcessorConnection {
  name: string;
  website: string;
  authorize(
    rawAuthRequest: RawAuthorizationRequest
  ): ParsedAuthorizationResponse;
  capture(rawCaptureRequest: RawCaptureRequest): ParsedCaptureResponse;
  cancel(rawCancelRequest: RawCancelRequest): ParsedCancelResponse;
}

export default ProcessorConnection;
