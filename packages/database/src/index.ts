/**
 * @file index.ts
 * @description Main export for @kodkong/database package
 * @module @kodkong/database
 *
 * @description
 * Exports Prisma Client instance and all generated types.
 * Single source of truth for database access across monorepo.
 *
 * @example
 * ```typescript
 * // Import Prisma client
 * import { prisma } from '@kodkong/database'
 *
 * // Import types
 * import type { User, Order, Payment } from '@kodkong/database'
 *
 * // Use in your code
 * const users: User[] = await prisma.user.findMany()
 * ```
 *
 * @author KodKong Team
 * @created 2026-03-05
 */

// Export Prisma Client instance
export { prisma } from './client'

// Re-export all Prisma generated types for type safety
export * from '@prisma/client'
