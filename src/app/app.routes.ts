import { Routes } from '@angular/router';
import { ComponentsShowcaseComponent } from './components/components-showcase.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app').then(m => m.App)
  },
  {
    path: 'showcase',
    component: ComponentsShowcaseComponent
  }
];