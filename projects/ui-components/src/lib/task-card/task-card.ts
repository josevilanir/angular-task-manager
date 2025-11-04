import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Tag } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Checkbox,
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

  getPriorityLabel(priority: string): string {
    const labels: { [key: string]: string } = {
      'low': 'Baixa',
      'medium': 'Média',
      'high': 'Alta'
    };
    return labels[priority] || priority;
  }

  getPrioritySeverity(priority: string): 'success' | 'warn' | 'danger' {
    const severities: { [key: string]: 'success' | 'warn' | 'danger' } = {
      'low': 'success',
      'medium': 'warn',
      'high': 'danger'
    };
    return severities[priority] || 'warn';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  isOverdue(): boolean {
    return !this.task.completed && new Date(this.task.dueDate) < new Date();
  }
}