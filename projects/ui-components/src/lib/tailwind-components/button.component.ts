import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="handleClick($event)"
      [class]="getClasses()"
      class="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      <i *ngIf="loading" class="pi pi-spin pi-spinner mr-2"></i>
      <i *ngIf="icon && !loading" [class]="icon" class="mr-2"></i>
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() icon?: string;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth: boolean = false;
  
  @Output() onClick = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }

  getClasses(): string {
    const variantClasses = {
      primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-purple-500/60',
      secondary: 'bg-gradient-to-r from-gray-600 to-slate-700 text-white shadow-lg shadow-gray-500/50 hover:from-gray-700 hover:to-slate-800 hover:shadow-xl',
      success: 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/50 hover:from-emerald-700 hover:to-green-700 hover:shadow-xl',
      danger: 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/50 hover:from-rose-700 hover:to-red-700 hover:shadow-xl',
      warning: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/50 hover:from-amber-700 hover:to-orange-700 hover:shadow-xl',
      info: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'
    };

    const sizeClasses = {
      xs: 'px-2.5 py-1.5 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl'
    };

    const widthClass = this.fullWidth ? 'w-full' : '';

    return `${variantClasses[this.variant]} ${sizeClasses[this.size]} ${widthClass}`;
  }
}