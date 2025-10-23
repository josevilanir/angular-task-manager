export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;         // booleano ✅
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
  estimateHours: number;      // numérico ✅
}