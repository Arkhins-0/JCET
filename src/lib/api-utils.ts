import { NextResponse } from "next/server";
import type { ApiResponse, PaginationMeta } from "@/types/api";

/** Standard success envelope: { success, data, message, meta? } */
export function ok<T>(
  data: T,
  message = "Success",
  meta?: PaginationMeta,
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    { success: true, data, message, ...(meta ? { meta } : {}) },
    { status }
  );
}

/** Standard error envelope. `data` is null on errors. */
export function fail(
  message: string,
  status = 400,
  details?: unknown
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    { success: false, data: null, message, ...(details ? { errors: details } : {}) },
    { status }
  );
}

/** Parse `page` & `limit` query params with sane bounds. */
export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const rawLimit = parseInt(searchParams.get("limit") ?? "10", 10) || 10;
  const limit = Math.min(100, Math.max(1, rawLimit));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

/** Build pagination meta from a total count. */
export function buildMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/** URL-friendly slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Generate a unique application number, e.g. JCET-2026-7F3K9Q.
 * Collisions are astronomically unlikely; callers retry on the rare unique
 * constraint violation.
 */
export function generateApplicationNumber(): string {
  const year = new Date().getFullYear();
  const rand = Array.from({ length: 6 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".charAt(Math.floor(Math.random() * 32))
  ).join("");
  return `JCET-${year}-${rand}`;
}

/** Wrap a Prisma Decimal / Decimal-like into a plain number for JSON. */
export function toNumber(value: unknown): number {
  if (value == null) return 0;
  return typeof value === "number" ? value : Number(value.toString());
}
