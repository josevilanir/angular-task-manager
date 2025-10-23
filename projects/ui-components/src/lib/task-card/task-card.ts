import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';
import { BadgeComponent } from '../tailwind-components/badge.component';
import { CardComponent } from '../tailwind-components/card.component';
import { ButtonComponent } from '../tailwind-components/button.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BadgeComponent,
    CardComponent,
    ButtonComponent
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

  getPriorityVariant(): 'success' | 'warning' | 'danger' {
    switch (this.task.priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'warning';
    }
  }

  getPriorityLabel(): string {
    const labels = {
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa'
    };
    return labels[this.task.priority];
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}