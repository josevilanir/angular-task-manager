import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSignal = signal<Task[]>([]);
  public tasks = this.tasksSignal.asReadonly();
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadTasks();
  }

  private loadTasks() {
    if (!this.isBrowser) {
      // Se não estiver no navegador, carrega dados de exemplo
      this.tasksSignal.set(this.getSampleTasks());
      return;
    }

    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      const tasks = parsedTasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        dueDate: new Date(task.dueDate)
      }));
      this.tasksSignal.set(tasks);
    } else {
      this.tasksSignal.set(this.getSampleTasks());
    }
  }

  private saveTasks() {
    if (this.isBrowser) {
      localStorage.setItem('tasks', JSON.stringify(this.tasksSignal()));
    }
  }

  private getSampleTasks(): Task[] {
    return [
      {
        id: '1',
        title: 'Implementar autenticação',
        description: 'Adicionar sistema de login e registro de usuários com JWT',
        completed: false,
        priority: 'high',
        dueDate: new Date(2025, 9, 30),
        createdAt: new Date(2025, 9, 20)
      },
      {
        id: '2',
        title: 'Revisar código do frontend',
        description: 'Fazer code review dos componentes React e melhorar performance',
        completed: true,
        priority: 'medium',
        dueDate: new Date(2025, 9, 25),
        createdAt: new Date(2025, 9, 18)
      },
      {
        id: '3',
        title: 'Atualizar documentação',
        description: 'Documentar as novas APIs REST criadas no último sprint',
        completed: false,
        priority: 'low',
        dueDate: new Date(2025, 10, 5),
        createdAt: new Date(2025, 9, 21)
      }
    ];
  }

  addTask(taskData: Partial<Task>): Task {
    const newTask: Task = {
      id: this.generateId(),
      title: taskData.title!,
      description: taskData.description!,
      completed: taskData.completed || false,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate!,
      createdAt: new Date()
    };

    const currentTasks = this.tasksSignal();
    this.tasksSignal.set([...currentTasks, newTask]);
    this.saveTasks();
    return newTask;
  }

  updateTask(id: string, taskData: Partial<Task>): Task | undefined {
    const currentTasks = this.tasksSignal();
    const index = currentTasks.findIndex(t => t.id === id);
    
    if (index !== -1) {
      const updatedTask = { ...currentTasks[index], ...taskData };
      const newTasks = [...currentTasks];
      newTasks[index] = updatedTask;
      this.tasksSignal.set(newTasks);
      this.saveTasks();
      return updatedTask;
    }
    return undefined;
  }

  deleteTask(id: string): boolean {
    const currentTasks = this.tasksSignal();
    const newTasks = currentTasks.filter(t => t.id !== id);
    
    if (newTasks.length !== currentTasks.length) {
      this.tasksSignal.set(newTasks);
      this.saveTasks();
      return true;
    }
    return false;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSignal().find(t => t.id === id);
  }

  toggleTaskComplete(id: string): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      return this.updateTask(id, { completed: !task.completed });
    }
    return undefined;
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}