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
              <span *ngSwitchCase="'APPLIED'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#3B82F6"><circle cx="10" cy="10" r="8"/></svg></span>
              <span *ngSwitchCase="'INTERVIEW'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#8B5CF6"><rect x="4" y="4" width="12" height="12" rx="3"/></svg></span>
              <span *ngSwitchCase="'OFFER'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#22C55E"><polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"/></svg></span>
              <span *ngSwitchCase="'ACCEPTED'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#FACC15"><path d="M7 10l3 3 5-5" stroke="#FACC15" stroke-width="2" fill="none"/></svg></span>
              <span *ngSwitchCase="'REJECTED'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#EF4444"><line x1="6" y1="6" x2="14" y2="14" stroke="#EF4444" stroke-width="2"/><line x1="14" y1="6" x2="6" y2="14" stroke="#EF4444" stroke-width="2"/></svg></span>
              <span *ngSwitchCase="'ON_HOLD'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#6B7280"><rect x="5" y="9" width="10" height="2" rx="1"/></svg></span>
              <span *ngSwitchCase="'PENDING'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#60A5FA"><circle cx="10" cy="10" r="8"/><rect x="9" y="5" width="2" height="6" rx="1" fill="#fff"/><rect x="9" y="13" width="2" height="2" rx="1" fill="#fff"/></svg></span>
              <span *ngSwitchCase="'FOLLOW_UP'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#EC4899"><path d="M10 2v16M2 10h16" stroke="#EC4899" stroke-width="2"/></svg></span>
              <span *ngSwitchCase="'ARCHIVED'" class="inline-block w-4 h-4"><svg viewBox="0 0 20 20" fill="#9CA3AF"><rect x="4" y="8" width="12" height="8" rx="2"/><rect x="6" y="4" width="8" height="4" rx="1"/></svg></span>
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
      case 'ACCEPTED': return 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-gray-900';
      case 'REJECTED': return 'bg-red-500 text-white dark:bg-red-400 dark:text-gray-900';
      case 'ON_HOLD': return 'bg-gray-500 text-white dark:bg-gray-400 dark:text-gray-900';
      case 'PENDING': return 'bg-blue-300 text-white dark:bg-blue-200 dark:text-gray-900';
      case 'FOLLOW_UP': return 'bg-pink-500 text-white dark:bg-pink-400 dark:text-gray-900';
      case 'ARCHIVED': return 'bg-gray-400 text-white dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-400 text-white dark:bg-gray-700 dark:text-gray-200';
    }
  }
} 