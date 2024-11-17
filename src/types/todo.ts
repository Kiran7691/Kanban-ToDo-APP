export type TodoStatus = 'todo' | 'in-progress' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  status: TodoStatus;
}