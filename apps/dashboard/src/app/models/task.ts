export interface Task {
  id?: number;
  title: string;
  description?: string;
  createdBy?: { id: number; email: string };
  assignee?: { id: number; email: string };
}
