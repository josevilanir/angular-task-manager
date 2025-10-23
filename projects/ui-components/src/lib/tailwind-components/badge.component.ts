import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';
type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="getClasses()"
      class="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 hover:scale-105"
    >
      <i *ngIf="icon" [class]="icon" class="mr-1.5"></i>
      <ng-content></ng-content>
    </span>
  `,
  styles: []
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';
  @Input() icon?: string;

  getClasses(): string {
    const variantClasses = {
      success: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/50',
      warning: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/50',
      danger: 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/50',
      info: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50',
      default: 'bg-gradient-to-r from-slate-500 to-gray-600 text-white shadow-lg shadow-slate-500/50'
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    };

    return `${variantClasses[this.variant]} ${sizeClasses[this.size]}`;
  }
}