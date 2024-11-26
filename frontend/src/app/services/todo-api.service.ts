import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TodoList } from "../core/interfaces/todo-list";

@Injectable({
  providedIn: "root",
})
export class TodoApiService {
  private apiUrl = "http://localhost:8080/todos/";

  constructor(private http: HttpClient) {}

  // Fetch all TODOs from the backend
  getTodos(): Observable<TodoList[]> {
    return this.http
      .get<TodoList[]>(this.apiUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Fetch a single TODO by ID from the backend
  getTodoById(todoId: number): Observable<TodoList> {
    return this.http
      .get<TodoList>(`${this.apiUrl}${todoId}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Add a new TODO to the backend
  addTodo(todo: TodoList): Observable<TodoList> {
    console.log(todo);
    return this.http
      .post<TodoList>(this.apiUrl, todo)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Update an existing TODO in the backend
  updateTodo(todo: TodoList): Observable<TodoList> {
    return this.http
      .put<TodoList>(`${this.apiUrl}${todo.id}`, todo)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Delete a TODO from the backend
  deleteTodo(todoId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}${todoId}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Common error handling method
  private handleError(error: any): Observable<never> {
    console.log("An error occurred:", error); // Log the error to the console
    let errorMessage = "An unknown error occurred!";
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
