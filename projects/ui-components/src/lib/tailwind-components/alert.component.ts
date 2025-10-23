import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertVariant = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="visible"
      [class]="getClasses()"
      class="rounded-xl p-4 shadow-lg animate-fade-in flex items-start gap-3"
      role="alert"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <i [class]="getIcon()" class="text-xl"></i>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <h4 *ngIf="title" class="font-bold text-lg mb-1">{{ title }}</h4>
        <div class="text-sm">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Close button -->
      <button 
        *ngIf="dismissible"
        (click)="close()"
        class="flex-shrink-0 rounded-lg p-1 hover:bg-black/10 transition-colors"
        type="button"
      >
        <i class="pi pi-times"></i>
      </button>
    </div>
  `,
  styles: []
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title?: string;
  @Input() dismissible: boolean = true;
  @Input() visible: boolean = true;
  
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.visible = false;
    this.onClose.emit();
  }

  getClasses(): string {
    const variantClasses = {
      success: 'bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 text-emerald-900',
      warning: 'bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 text-amber-900',
      danger: 'bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 text-rose-900',
      info: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 text-blue-900'
    };

    return variantClasses[this.variant];
  }

  getIcon(): string {
    const iconClasses = {
      success: 'pi pi-check-circle text-emerald-600',
      warning: 'pi pi-exclamation-triangle text-amber-600',
      danger: 'pi pi-times-circle text-rose-600',
      info: 'pi pi-info-circle text-blue-600'
    };

    return iconClasses[this.variant];
  }
}