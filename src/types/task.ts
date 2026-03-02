export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  type: Priority;
  createdAt: string;
  deadline: string;
  assignedTo: string;
}

export interface Subtask {
  id: string;
  taskId: string;       
  parentId: string | null; 
  title: string;
}