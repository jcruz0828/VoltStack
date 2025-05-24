import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 flex flex-col gap-2 border border-blue-100 dark:border-gray-700 transition-all duration-200 hover:shadow-2xl hover:scale-[1.01]">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h2 class="text-xl font-bold text-blue-700 dark:text-yellow-300">{{ application.jobTitle }}</h2>
          <span
            class="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 transition-colors duration-200 flex items-center gap-1"
            [ngClass]="getStatusBadgeClass(application.jobStatus)"
          >
            <ng-container [ngSwitch]="application.jobStatus">
              <span *ngSwitchCase="'APPLIED'" class="material-icons text-blue-200 text-base">send</span>
              <span *ngSwitchCase="'INTERVIEW'" class="material-icons text-purple-200 text-base">event_available</span>
              <span *ngSwitchCase="'OFFER'" class="material-icons text-green-200 text-base">card_giftcard</span>
              <span *ngSwitchCase="'REJECTED'" class="material-icons text-red-200 text-base">cancel</span>
              <span *ngSwitchCase="'ACCEPTED'" class="material-icons text-emerald-200 text-base">check_circle</span>
            </ng-container>
            {{ application.jobStatus }}
          </span>
        </div>
        <div class="flex gap-2">
          <button (click)="update.emit(application)" class="px-3 py-1 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-300 transition-colors duration-200">Update</button>
          <button (click)="delete.emit(application)" class="px-3 py-1 rounded-lg bg-pink-600 text-white font-bold hover:bg-pink-500 transition-colors duration-200">Delete</button>
        </div>
      </div>
      <div class="text-gray-700 dark:text-gray-200 font-semibold transition-colors duration-200">
        {{ application.name || application.companyName }}
      </div>
      <div class="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
        {{ application.description || application.companyDescription }}
      </div>
    </div>
  `
})
export class ApplicationCardComponent {
  @Input() application: any;
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  getStatusBadgeClass(status: string) {
    switch (status) {
      case 'APPLIED': return 'bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900';
      case 'INTERVIEW': return 'bg-purple-500 text-white dark:bg-purple-400 dark:text-gray-900';
      case 'OFFER': return 'bg-green-500 text-white dark:bg-green-400 dark:text-gray-900';
      case 'REJECTED': return 'bg-red-500 text-white dark:bg-red-400 dark:text-gray-900';
      case 'ACCEPTED': return 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-gray-900';
      default: return 'bg-gray-400 text-white dark:bg-gray-700 dark:text-gray-200';
    }
  }
} 