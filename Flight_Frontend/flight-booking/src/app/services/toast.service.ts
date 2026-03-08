import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  private show(type: Toast['type'], title: string, message?: string): void {
    const id = Math.random().toString(36).slice(2);
    this.toasts.update(t => [...t, { id, type, title, message }]);
    setTimeout(() => this.remove(id), 4000);
  }

  success(title: string, message?: string) { this.show('success', title, message); }
  error(title: string, message?: string) { this.show('error', title, message); }
  warning(title: string, message?: string) { this.show('warning', title, message); }
  info(title: string, message?: string) { this.show('info', title, message); }

  remove(id: string): void {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
