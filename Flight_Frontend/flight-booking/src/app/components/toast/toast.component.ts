import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  constructor(public toastService: ToastService) { }

  getClass(type: Toast['type']): string {
    const map: Record<string, string> = {
      success: 'border-l-4 border-l-emerald-400',
      error: 'border-l-4 border-l-red-400',
      warning: 'border-l-4 border-l-amber-400',
      info: 'border-l-4 border-l-brand-400',
    };
    return map[type] || '';
  }

  getIconBg(type: Toast['type']): string {
    const map: Record<string, string> = {
      success: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-500',
      error: 'bg-red-100 dark:bg-red-950 text-red-500',
      warning: 'bg-amber-100 dark:bg-amber-950 text-amber-500',
      info: 'bg-brand-100 dark:bg-brand-950 text-brand-500',
    };
    return map[type] || '';
  }

  getIcon(type: Toast['type']): string {
    const map: Record<string, string> = {
      success: 'M5 13l4 4L19 7',
      error: 'M6 18L18 6M6 6l12 12',
      warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    };
    return map[type] || '';
  }
}
