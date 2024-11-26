import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoList } from '../core/interfaces/todo-list';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private apiUrl = 'http://localhost:8080/api/todos/';

  constructor(private http: HttpClient) {}

  // Fetch all TODOs from the backend
  getTodos(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.apiUrl);
  }

  // Fetch a single TODO by ID from the backend
  getTodoById(todoId: number): Observable<TodoList> {
    return this.http.get<TodoList>(`${this.apiUrl}${todoId}`);
  }

  // Add a new TODO to the backend
  addTodo(todo: TodoList): Observable<TodoList> {
    console.log(todo);
    return this.http.post<TodoList>(this.apiUrl, todo);
  }

  // Update an existing TODO in the backend
  updateTodo(todo: TodoList): Observable<TodoList> {
    return this.http.put<TodoList>(`${this.apiUrl}${todo.id}`, todo);
  }

  // Delete a TODO from the backend
  deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${todoId}`);
  }
}
