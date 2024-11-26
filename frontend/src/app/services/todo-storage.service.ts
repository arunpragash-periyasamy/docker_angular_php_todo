import { Injectable, signal } from '@angular/core';
import { TodoList } from '../core/interfaces/todo-list';

@Injectable({
  providedIn: 'root',
})
export class TodoStorageService {
  private todoList = signal<TodoList[]>([]);
  constructor() {}

  getTodoList(): TodoList[] {
    return this.todoList();
  }

  getTodo(todoId: number) : TodoList | null {
    return this.todoList().find(todo=>todo.id=todoId)|| null;
  }

  updateTodo(todoTask: TodoList) : void{
    this.todoList.update(previous=> previous.map(item=> item.id === todoTask.id ? todoTask : item));
  }
  addTodo(todoTask: TodoList): void {
    this.todoList.update(previous=> [...previous, todoTask]);
  }
  deleteTodo(id:number): void {
    this.todoList.update(previous=> previous.filter(item=> item.id !== id));
  }
  generateId(): number {
    return this.todoList().length + 1;
  }
}





