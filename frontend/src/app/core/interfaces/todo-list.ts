export interface TodoList {
  id: number;
  todoTitle: string;
  todoDescription: string;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
