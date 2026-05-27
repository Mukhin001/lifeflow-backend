export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface TaskData {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
}
