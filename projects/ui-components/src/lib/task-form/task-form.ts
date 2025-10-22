import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    Button
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {
  @Input() task?: Task;
  @Output() onSave = new EventEmitter<Partial<Task>>();
  @Output() onCancel = new EventEmitter<void>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.task?.description || '', [Validators.required, Validators.minLength(10)]],
      priority: [this.task?.priority || 'medium', Validators.required],
      dueDate: [this.task?.dueDate ? this.formatDateForInput(this.task.dueDate) : '', Validators.required],
      completed: [this.task?.completed || false]
    });
  }

  formatDateForInput(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      if (formValue.dueDate) {
        formValue.dueDate = new Date(formValue.dueDate);
      }
      this.onSave.emit(formValue);
      this.taskForm.reset();
    }
  }

  cancel() {
    this.onCancel.emit();
    this.taskForm.reset();
  }

  get isEditMode(): boolean {
    return !!this.task;
  }
}