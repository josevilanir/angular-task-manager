import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    Button,
    Tag,
    FormsModule
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  @Input() task!: Task;
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onToggleComplete = new EventEmitter<Task>();

  editTask() {
    this.onEdit.emit(this.task);
  }

  deleteTask() {
    this.onDelete.emit(this.task);
  }

  toggleComplete() {
    this.onToggleComplete.emit(this.task);
  }

  getPrioritySeverity(): 'success' | 'info' | 'warn' | 'danger' {
    switch (this.task.priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warn';
      case 'low':
        return 'info';
      default:
        return 'info';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}