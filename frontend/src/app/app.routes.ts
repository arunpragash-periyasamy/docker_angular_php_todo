import { Routes } from '@angular/router';
import { AddTodoComponent } from './modules/add-todo/add-todo.component';
import { TodoListComponent } from './modules/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: '',
    component: AddTodoComponent,
  },
  {
    path: 'edit/:id',
    component: AddTodoComponent,
  },
  {
    path: 'todo-list',
    component: TodoListComponent,
  }
];
