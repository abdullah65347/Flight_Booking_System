import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-20 text-center animate-fade-up">
      <div class="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="icon || defaultIcon" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-lg text-slate-700 dark:text-slate-300 mb-2">{{ title }}</h3>
      <p class="text-sm text-slate-400 dark:text-slate-500 max-w-xs">{{ message }}</p>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() title = 'Nothing here yet';
  @Input() message = 'No items to display.';
  @Input() icon?: string;
  defaultIcon = 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2';
}
