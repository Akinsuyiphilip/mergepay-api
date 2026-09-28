/**
 * SEP-24 request schemas — issue #366.
 *
 * The canonical Zod schemas for SEP-24 deposit/withdrawal initialization and
 * status requests live in `src/validations/sep24.ts`, which both anchor route
 * files apply inside their handlers (src/routes/anchors.ts for
 * `/anchors/deposit|withdraw`, src/routes/sep24.ts for
 * `/api/sep24/deposit|withdraw`) so malformed query strings and payloads are
 * rejected with a 400 VALIDATION_ERROR before any anchor I/O happens.
 *
 * This module re-exports them under the location the issue names so callers
 * have a single import point and there is exactly one source of truth — the
 * earlier divergent schema that lived here (regex-only account checks, no
 * amount/memo rules) was never wired into a route and has been removed rather
 * than left as a weaker duplicate.
 */
export {
  sep24AccountSchema,
  sep24AmountSchema,
  sep24AssetCodeSchema,
  sep24CallbackQuerySchema,
  sep24DepositRequestSchema,
  sep24ExtraMetadataSchema,
  sep24InitQuerySchema,
  sep24InteractiveRequestSchema,
  sep24MemoSchema,
  sep24MemoTypeSchema,
  sep24StellarTransactionHashSchema,
  sep24WithdrawRequestSchema,
  type Sep24CallbackQuery,
  type Sep24InitQuery,
  type Sep24InteractiveRequest,
  type Sep24DepositRequest,
  type Sep24WithdrawRequest,
} from "../validations/sep24";

import type { FastifyRequest, FastifyReply } from "fastify";
import {
  sep24DepositRequestSchema,
  sep24WithdrawRequestSchema,
  sep24InitQuerySchema,
} from "../validations/sep24";

/**
 * Request validation middleware for SEP-24 deposit initiation endpoint.
 * Validates query parameters and request body using Zod schemas.
 */
export async function validateSep24Deposit(
  req: FastifyRequest,
  _reply: FastifyReply
): Promise<void> {
  req.query = sep24InitQuerySchema.parse(req.query ?? {});
  req.body = sep24DepositRequestSchema.parse(req.body);
}

/**
 * Request validation middleware for SEP-24 withdrawal initiation endpoint.
 * Validates query parameters and request body using Zod schemas.
 */
export async function validateSep24Withdraw(
  req: FastifyRequest,
  _reply: FastifyReply
): Promise<void> {
  req.query = sep24InitQuerySchema.parse(req.query ?? {});
  req.body = sep24WithdrawRequestSchema.parse(req.body);
}
