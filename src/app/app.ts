import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../projects/ui-components/src/lib/task-list/task-list';
import { TaskForm } from '../../projects/ui-components/src/lib/task-form/task-form';
import { TaskService, Task } from './services/task.service';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TaskList,
    TaskForm,
    Dialog,
    ConfirmDialog,
    Toast,
    Button,
    Toolbar
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Task Manager - Gerenciador de Tarefas');
  
  displayDialog = signal(false);
  selectedTask = signal<Task | undefined>(undefined);
  tasks = computed(() => this.taskService.tasks());

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  showAddDialog() {
    this.selectedTask.set(undefined);
    this.displayDialog.set(true);
  }

  showEditDialog(task: Task) {
    this.selectedTask.set(task);
    this.displayDialog.set(true);
  }

  hideDialog() {
    this.displayDialog.set(false);
    this.selectedTask.set(undefined);
  }

  saveTask(taskData: Partial<Task>) {
    const currentTask = this.selectedTask();
    
    if (currentTask) {
      this.taskService.updateTask(currentTask.id, taskData);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Tarefa atualizada com sucesso!'
      });
    } else {
      this.taskService.addTask(taskData);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Tarefa criada com sucesso!'
      });
    }
    
    this.hideDialog();
  }

  deleteTask(task: Task) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a tarefa "${task.title}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.taskService.deleteTask(task.id);
        this.messageService.add({
          severity: 'info',
          summary: 'Excluído',
          detail: 'Tarefa excluída com sucesso!'
        });
      }
    });
  }

  toggleComplete(task: Task) {
    this.taskService.toggleTaskComplete(task.id);
    const message = task.completed 
      ? 'Tarefa marcada como pendente' 
      : 'Tarefa marcada como concluída';
    
    this.messageService.add({
      severity: 'info',
      summary: 'Status Atualizado',
      detail: message
    });
  }
}