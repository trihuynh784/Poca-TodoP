import z from "zod";

export const PaginationSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type PaginationOption = z.TypeOf<typeof PaginationSchema>;
