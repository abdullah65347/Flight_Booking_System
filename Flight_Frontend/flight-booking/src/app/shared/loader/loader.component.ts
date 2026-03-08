import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="relative w-12 h-12">
        <div class="absolute inset-0 rounded-full border-2 border-brand-100 dark:border-brand-900"></div>
        <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 animate-spin"></div>
      </div>
      @if (message) {
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ message }}</p>
      }
    </div>
  `
})
export class LoaderComponent {
  @Input() message = '';
}
