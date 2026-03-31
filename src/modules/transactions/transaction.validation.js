import { z } from 'zod';

export const createTransactionSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(150),
    amount: z.number().positive(),
    type: z.enum(['INCOME', 'EXPENSE']),
    date: z.string().datetime(),
    note: z.string().max(500).optional(),
    categoryId: z.number().int().positive().optional()
  }),
  params: z.object({}),
  query: z.object({})
});

export const updateTransactionSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(150).optional(),
    amount: z.number().positive().optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    date: z.string().datetime().optional(),
    note: z.string().max(500).optional(),
    categoryId: z.number().int().positive().nullable().optional()
  }),
  params: z.object({
    id: z.coerce.number().int().positive()
  }),
  query: z.object({})
});
