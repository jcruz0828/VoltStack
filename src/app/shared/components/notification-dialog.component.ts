import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from './notification-panel.component';

@Component({
  selector: 'app-notification-dialog',
  template: `
    <div class="p-6 min-w-[320px] max-w-[90vw]">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-blue-900 dark:text-yellow-300">{{ data.title }}</h2>
        <button mat-icon-button mat-dialog-close class="text-gray-400 hover:text-pink-500">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="mb-4 text-gray-700 dark:text-yellow-200 text-base">{{ data.message }}</div>
      <div *ngIf="data.metadata" class="mb-4 space-y-1">
        <div *ngIf="data.metadata?.company"><span class="font-semibold">Company:</span> {{ data.metadata?.company }}</div>
        <div *ngIf="data.metadata?.jobTitle"><span class="font-semibold">Job Title:</span> {{ data.metadata?.jobTitle }}</div>
        <div *ngIf="data.metadata?.status"><span class="font-semibold">Status:</span> {{ data.metadata?.status }}</div>
      </div>
      <div class="text-xs text-gray-500 dark:text-yellow-400 mt-2">{{ data.time }}</div>
    </div>
  `,
  styles: [
    `:host { display: block; }
     .mat-dialog-container { border-radius: 1.25rem; padding: 0; }
    `
  ]
})
export class NotificationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Notification) {}
} 