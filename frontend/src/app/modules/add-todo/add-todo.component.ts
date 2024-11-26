import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoStorageService } from './../../services/todo-storage.service';
import { TodoList } from '../../core/interfaces/todo-list';
import { TodoApiService } from '../../services/todo-api.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  editId!: number;
  oldTodo!: TodoList | null;
  form: FormGroup;

  private formBuilder = inject(FormBuilder);
  private todoStorageService = inject(TodoStorageService);
  private todoAPIService = inject(TodoApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  constructor() {
    this.form = this.formBuilder.group({
      todoTitle: ['', Validators.required],
      todoDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.editId = idParam ? parseInt(idParam, 10) : 0;
    if (!isNaN(this.editId)) {
      try {
        this.todoAPIService.getTodoById(this.editId).subscribe(data => {
          this.oldTodo = data;
          if (this.oldTodo) {
            this.form.patchValue(this.oldTodo);
          }
        });
      }catch(err){}
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.editId > 0 && this.oldTodo) {
        try {
          this.todoAPIService.updateTodo({
            ...this.form.value,
            id: this.editId,
            isCompleted: false,
            createdAt: this.oldTodo?.createdAt,
            updatedAt: new Date(),
          }).subscribe(data => {
            alert("Todo updated");
            this.form.reset();
            this.router.navigate(['/todo-list']);
          });
        }catch(err){}
      } else {
        try {
          this.todoAPIService
            .addTodo({
              ...this.form.value,
              id: 0,
              isCompleted: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .subscribe({
              next: (response) => {
                this.form.reset();
                alert("Todo created");
              },
              error: (err) => {
                console.error('Error adding Todo:', err);
              },
            });
        }
        catch (err) { }
      }
      console.log(this.todoStorageService.getTodoList());
    }
  }
}
