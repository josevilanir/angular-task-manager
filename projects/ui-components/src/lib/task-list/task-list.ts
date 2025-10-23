import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../models/task.model';
import { ButtonComponent } from '../tailwind-components/button.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskCard,
    ButtonComponent  // ← ADICIONAR ESTA LINHA
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  @Input() tasks: Task[] = [];
  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onToggleComplete = new EventEmitter<Task>();

  addTask() {
    this.onAdd.emit();
  }

  editTask(task: Task) {
    this.onEdit.emit(task);
  }

  deleteTask(task: Task) {
    this.onDelete.emit(task);
  }

  toggleComplete(task: Task) {
    this.onToggleComplete.emit(task);
  }

  // Métodos para estatísticas
  get completedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  get pendingCount(): number {
    return this.tasks.filter(t => !t.completed).length;
  }
}