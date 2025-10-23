// src/app/services/task.service.ts
import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { Task } from '../../../projects/ui-components/src/lib/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private platformId = inject(PLATFORM_ID);
  private storageKey = 'tasks';

  private tasksSignal = signal<Task[]>(this.load());

  // ===== Persistence =====
  private load(): Task[] {
    if (isPlatformBrowser(this.platformId)) {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        try {
          const arr: any[] = JSON.parse(raw);
          return arr.map((t) => ({
            ...t,
            // garante tipos corretos
            createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
            dueDate: t.dueDate ? new Date(t.dueDate) : new Date(),
            estimateHours: Number(t.estimateHours ?? 0),
            completed: Boolean(t.completed ?? false),
          })) as Task[];
        } catch {}
      }
    }
    // seed inicial com estimateHours
    const now = new Date();
    return [
      {
        id: '1',
        title: 'Implementar autenticação',
        description: 'Adicionar login com JWT e refresh token',
        completed: false,
        priority: 'high',
        dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
        createdAt: now,
        estimateHours: 6,
      },
      {
        id: '2',
        title: 'Revisar código do frontend',
        description: 'Refatorar componentes e otimizar performance',
        completed: true,
        priority: 'medium',
        dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
        createdAt: now,
        estimateHours: 3.5,
      },
    ];
  }

  private persist() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasksSignal()));
    }
  }

  // ===== API =====
  getTasks(): Task[] {
    return this.tasksSignal();
  }

  createTask(payload: Partial<Task>): Task {
    const now = new Date();
    const task: Task = {
      id: this.generateId(),
      title: String(payload.title ?? 'Nova tarefa'),
      description: String(payload.description ?? ''),
      completed: Boolean(payload.completed ?? false),
      priority: (payload.priority as any) ?? 'medium',
      dueDate: payload.dueDate ? new Date(payload.dueDate) : now,
      createdAt: now,
      estimateHours: Number(payload.estimateHours ?? 0), // numérico ✅
    };
    this.tasksSignal.update((list) => [task, ...list]);
    this.persist();
    return task;
  }

  updateTask(id: string, patch: Partial<Task>): Task | undefined {
    let updated: Task | undefined;
    this.tasksSignal.update((list) =>
      list.map((t) => {
        if (t.id !== id) return t;
        updated = {
          ...t,
          ...patch,
          dueDate: patch.dueDate ? new Date(patch.dueDate) : t.dueDate,
          estimateHours: patch.estimateHours !== undefined ? Number(patch.estimateHours) : t.estimateHours,
        };
        return updated!;
      })
    );
    if (updated) this.persist();
    return updated;
  }

  deleteTask(id: string) {
    this.tasksSignal.update((list) => list.filter((t) => t.id !== id));
    this.persist();
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSignal().find((t) => t.id === id);
  }

  toggleTaskComplete(id: string): Task | undefined {
    let updated: Task | undefined;
    this.tasksSignal.update((list) =>
      list.map((t) =>
        t.id === id ? ((updated = { ...t, completed: !t.completed }), updated) : t
      )
    );
    if (updated) this.persist();
    return updated;
  }

  // ===== Utils =====
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
}
