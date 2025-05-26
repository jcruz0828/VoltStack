import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { trigger, transition, style, animate } from '@angular/animations';

export enum NotificationType {
  STATUS_UPDATE = 'STATUS_UPDATE',
  NEW_MESSAGE = 'NEW_MESSAGE',
  REMINDER = 'REMINDER',
  FEEDBACK_RECEIVED = 'FEEDBACK_RECEIVED',
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  MANUAL_NOTE = 'MANUAL_NOTE',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  ERROR = 'ERROR',
  INFO = 'INFO'
}

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  metadata?: {
    company?: string;
    jobTitle?: string;
    status?: string;
  };
}

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatRippleModule,
    MatListModule,
    MatChipsModule
  ],
  template: `
    <div class="fixed right-0 top-20 h-[calc(100vh-5rem)] w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-l border-blue-100 dark:border-gray-800 shadow-xl">
      <!-- Header -->
      <header class="p-4 border-b border-blue-100 dark:border-gray-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <mat-icon class="text-blue-600 dark:text-yellow-400">notifications</mat-icon>
          <h2 class="text-lg font-bold text-gray-900 dark:text-yellow-300">Notifications</h2>
        </div>
        <button mat-icon-button class="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400">
          <mat-icon>settings</mat-icon>
        </button>
      </header>

      <!-- Notifications List -->
      <main class="overflow-y-auto h-[calc(100%-4rem)]">
        <mat-nav-list>
          <ng-container *ngFor="let notification of notifications">
            <div mat-list-item
              [class.bg-blue-50]="!notification.read"
              [class.dark:bg-gray-800]="!notification.read"
              (click)="markAsRead(notification)"
              class="hover:bg-blue-50 dark:hover:bg-gray-800/50 transition-colors">
              <div class="flex items-start gap-3 w-full">
                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <mat-icon class="inline-block w-6 h-6" [innerHTML]="getNotificationIcon(notification.type)"></mat-icon>
                </div>

                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-900 dark:text-yellow-300 truncate">
                    {{ notification.title }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-yellow-200 truncate">
                    {{ notification.message }}
                  </p>
                  <time class="text-xs text-gray-500 dark:text-yellow-200/70 mt-1 block">
                    {{ notification.time }}
                  </time>

                  <div *ngIf="notification.metadata && notification.metadata.company" class="mt-1 flex gap-2">
                    <mat-chip class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {{ notification.metadata.company }}
                    </mat-chip>
                    <mat-chip *ngIf="notification.metadata.jobTitle" class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                      {{ notification.metadata.jobTitle }}
                    </mat-chip>
                  </div>
                </div>

                <div *ngIf="!notification.read" class="flex-shrink-0">
                  <div class="w-2 h-2 rounded-full bg-pink-500"></div>
                </div>
              </div>
            </div>
          </ng-container>
        </mat-nav-list>

        <div *ngIf="notifications.length === 0" class="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
          <mat-icon class="text-4xl mb-2">notifications_off</mat-icon>
          <p>No notifications yet</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class NotificationPanelComponent implements OnInit {
  notifications: Notification[] = [
    {
      id: 1,
      type: NotificationType.APPLICATION_SUBMITTED,
      title: 'Application Submitted',
      message: 'Your application to Google has been submitted',
      time: '2 minutes ago',
      read: false,
      metadata: {
        company: 'Google',
        jobTitle: 'Software Engineer'
      }
    },
    {
      id: 2,
      type: NotificationType.STATUS_UPDATE,
      title: 'Status Update',
      message: 'Your application at Microsoft moved to Interview stage',
      time: '1 hour ago',
      read: false,
      metadata: {
        company: 'Microsoft',
        status: 'INTERVIEW'
      }
    },
    {
      id: 3,
      type: NotificationType.FEEDBACK_RECEIVED,
      title: 'Feedback Received',
      message: 'You received feedback on your Amazon interview',
      time: '3 hours ago',
      read: true,
      metadata: {
        company: 'Amazon'
      }
    },
    {
      id: 4,
      type: NotificationType.REMINDER,
      title: 'Interview Reminder',
      message: 'Don\'t forget your interview with Apple tomorrow',
      time: '5 hours ago',
      read: true,
      metadata: {
        company: 'Apple',
        jobTitle: 'Senior Developer'
      }
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  getNotificationIcon(type: NotificationType): string {
    switch (type) {
      case NotificationType.STATUS_UPDATE:
        return `<svg viewBox="0 0 20 20" fill="#3B82F6"><path d="M10 2v16M2 10h16" stroke="#3B82F6" stroke-width="2"/></svg>`;
      case NotificationType.NEW_MESSAGE:
        return `<svg viewBox="0 0 20 20" fill="#8B5CF6"><path d="M2 4h16v12H2V4zm2 2v8h12V6H4zm2 2h8v4H6V8z"/></svg>`;
      case NotificationType.REMINDER:
        return `<svg viewBox="0 0 20 20" fill="#EC4899"><path d="M10 2v16M2 10h16" stroke="#EC4899" stroke-width="2"/></svg>`;
      case NotificationType.FEEDBACK_RECEIVED:
        return `<svg viewBox="0 0 20 20" fill="#22C55E"><path d="M10 2l2.5 7.5H20l-6.25 4.5 2.5 7.5L10 17l-6.25 4.5 2.5-7.5L0 9.5h7.5L10 2z"/></svg>`;
      case NotificationType.APPLICATION_SUBMITTED:
        return `<svg viewBox="0 0 20 20" fill="#3B82F6"><circle cx="10" cy="10" r="8"/></svg>`;
      case NotificationType.MANUAL_NOTE:
        return `<svg viewBox="0 0 20 20" fill="#F59E0B"><path d="M2 4h16v12H2V4zm2 2v8h12V6H4zm2 2h8v4H6V8z"/></svg>`;
      case NotificationType.SYSTEM_ALERT:
        return `<svg viewBox="0 0 20 20" fill="#6B7280"><path d="M10 2l8 16H2L10 2zm0 4v6m0 2v2"/></svg>`;
      case NotificationType.ERROR:
        return `<svg viewBox="0 0 20 20" fill="#EF4444"><path d="M10 2l8 16H2L10 2zm0 4v6m0 2v2"/></svg>`;
      case NotificationType.INFO:
        return `<svg viewBox="0 0 20 20" fill="#60A5FA"><circle cx="10" cy="10" r="8"/><path d="M9 7h2v2H9V7zm0 4h2v6H9v-6z"/></svg>`;
      default:
        return `<svg viewBox="0 0 20 20" fill="#6B7280"><circle cx="10" cy="10" r="8"/></svg>`;
    }
  }
} 