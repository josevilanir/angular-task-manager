// src/app/app.ts
import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { TaskList } from '../../projects/ui-components/src/lib/task-list/task-list';
import { TaskForm } from '../../projects/ui-components/src/lib/task-form/task-form';

// 👇 IMPORTA O MODELO COMPARTILHADO
import type { Task } from '../../projects/ui-components/src/lib/models/task.model';

import { TaskService } from './services/task.service';

import { Dialog } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    // PrimeNG
    Dialog,
    ConfirmDialog,
    Toast,
    Toolbar,
    Button,

    // UI Components
    TaskList,
    TaskForm,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  title = signal('Task Manager');
  dialogVisible = signal(false);
  isEditing = signal(false);
  currentTask = signal<Task | null>(null);

  private taskService = inject(TaskService);
  private confirm = inject(ConfirmationService);
  private messages = inject(MessageService);

  currentYear = computed(() => new Date().getFullYear());

  // Fornece as tarefas para o template
  tasks(): Task[] {
    // se seu service expõe signal(), pegue o valor; senão, getTasks()
    const anySvc = this.taskService as any;
    if (typeof anySvc.tasksSignal === 'function') return anySvc.tasksSignal() as Task[];
    if (typeof anySvc.tasks === 'function') return anySvc.tasks() as Task[];
    if (typeof anySvc.getTasks === 'function') return anySvc.getTasks() as Task[];
    return [];
  }

  openCreateDialog() {
    this.currentTask.set(null);
    this.isEditing.set(false);
    this.dialogVisible.set(true);
  }

  openEditDialog(task: Task) {
    this.currentTask.set(task);
    this.isEditing.set(true);
    this.dialogVisible.set(true);
  }

  closeDialog() {
    this.dialogVisible.set(false);
    this.currentTask.set(null);
    this.isEditing.set(false);
  }

  saveTask(payload: Partial<Task>) {
    try {
      if (this.isEditing()) {
        const t = this.currentTask();
        if (!t) return;
        this.taskService.updateTask(t.id, payload);
        this.messages.add({ severity: 'success', summary: 'Atualizado', detail: 'Tarefa atualizada com sucesso!' });
      } else {
        this.taskService.createTask(payload); // ver implementação no service abaixo
        this.messages.add({ severity: 'success', summary: 'Criado', detail: 'Tarefa criada com sucesso!' });
      }
    } finally {
      this.closeDialog();
    }
  }

  confirmDelete(task: Task) {
    this.confirm.confirm({
      header: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir "${task.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.taskService.deleteTask(task.id);
        this.messages.add({ severity: 'warn', summary: 'Excluído', detail: 'Tarefa excluída com sucesso!' });
      },
    });
  }

  toggleComplete(task: Task) {
    this.taskService.toggleTaskComplete(task.id);
    const becameCompleted = !task.completed;
    this.messages.add({
      severity: 'info',
      summary: 'Status atualizado',
      detail: becameCompleted ? 'Tarefa marcada como concluída' : 'Tarefa marcada como pendente',
    });
  }
}
export { AppComponent as App };