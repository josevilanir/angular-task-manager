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
        dueDate: new Date(2025, 10, 30),
        createdAt: new Date(2025, 10, 20)
      },
      {
        id: '2',
        title: 'Revisar código do frontend',
        description: 'Fazer code review dos componentes Angular e melhorar performance',
        completed: true,
        priority: 'medium',
        dueDate: new Date(2025, 10, 25),
        createdAt: new Date(2025, 10, 18)
      },
      {
        id: '3',
        title: 'Atualizar documentação',
        description: 'Documentar as novas APIs REST criadas no último sprint',
        completed: false,
        priority: 'low',
        dueDate: new Date(2025, 11, 5),
        createdAt: new Date(2025, 10, 21)
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

  updateTask(id: string, updates: Partial<Task>): void {
    const currentTasks = this.tasksSignal();
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    this.tasksSignal.set(updatedTasks);
    this.saveTasks();
  }

  deleteTask(id: string): void {
    const currentTasks = this.tasksSignal();
    const filteredTasks = currentTasks.filter(task => task.id !== id);
    this.tasksSignal.set(filteredTasks);
    this.saveTasks();
  }

  toggleTaskComplete(id: string): void {
    const currentTasks = this.tasksSignal();
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSignal.set(updatedTasks);
    this.saveTasks();
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSignal().find(task => task.id === id);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}