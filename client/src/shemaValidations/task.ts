import z from "zod";

export const TaskBodySchema = z.object({
  _id: z.string(),
  title: z.string().min(2),
  status: z.enum(["active", "completed"]),
  completedAt: z.date().nullable,
  createdAt: z.date(),
});

export const CreateTaskSchema = z.object({
  title: z.string().min(2, {
    message: "Vui lòng nhập công việc!",
  }),
});

export type Task = z.TypeOf<typeof TaskBodySchema>;
export type FormCreateTask = z.TypeOf<typeof CreateTaskSchema>;
