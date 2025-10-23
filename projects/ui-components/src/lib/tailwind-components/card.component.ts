import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getClasses()" 
         class="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden animate-fade-in"
         [class.hover:shadow-2xl]="hoverable"
         [class.hover:-translate-y-1]="hoverable">
      
      <!-- Header -->
      <div *ngIf="hasHeader" class="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <ng-content select="[header]"></ng-content>
      </div>

      <!-- Body -->
      <div class="px-6 py-5">
        <ng-content></ng-content>
      </div>

      <!-- Footer -->
      <div *ngIf="hasFooter" class="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() hoverable: boolean = true;
  @Input() hasHeader: boolean = false;
  @Input() hasFooter: boolean = false;
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  getClasses(): string {
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-8'
    };

    return paddingClasses[this.padding];
  }
}