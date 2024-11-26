import { TodoApiService } from './../../services/todo-api.service';
import { TodoList } from './../../core/interfaces/todo-list';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todoList: TodoList[] = [];
  private todoApiService = inject(TodoApiService);
  private router = inject(Router);
  constructor() {
    this.getTodoData();
  }
  getTodoData(): void {
    this.todoApiService.getTodos().subscribe((data) => {
      this.todoList = data;
    });
  }
  edit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  delete(todoId: number) {
    if (confirm('Are you sure want to delete this todo?')) {
      this.todoApiService.deleteTodo(todoId).subscribe();
      alert('Data deleted successfully');
      this.getTodoData();
    } else {
      alert('Data not deleted');
    }
  }
}
