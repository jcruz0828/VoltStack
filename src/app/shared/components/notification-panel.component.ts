import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    <!-- Notification Details Modal (now overlays the whole screen) -->
    <div *ngIf="notificationModalVisible" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-blue-100 dark:border-gray-700 relative flex flex-col items-start gap-4 transition-all duration-300 glass-modal">
        <button (click)="closeNotificationModal()" class="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-3xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-full w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-gray-800/70 shadow-md">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 class="text-3xl font-extrabold mb-2 text-blue-900 dark:text-yellow-300 tracking-tight">{{ selectedNotification?.title }}</h2>
        <div class="mb-2 text-gray-700 dark:text-yellow-200 text-lg">{{ selectedNotification?.message }}</div>
        <div *ngIf="selectedNotification?.metadata" class="mb-2">
          <span *ngIf="selectedNotification?.metadata?.company" class="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-sm text-blue-700 dark:text-blue-200 font-semibold shadow-sm truncate" title="{{ selectedNotification?.metadata?.company }}">{{ selectedNotification?.metadata?.company }}</span>
          <span *ngIf="selectedNotification?.metadata?.status" class="inline-flex items-center justify-center gap-1 mt-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 shadow-sm">{{ getStatusLabel(selectedNotification?.metadata?.status || '') }}</span>
        </div>
        <div class="text-xs text-gray-500 dark:text-yellow-400 mt-2">{{ selectedNotification?.time }}</div>
      </div>
    </div>
    <!-- Sidebar Panel -->
    <div class="fixed right-0 top-0 h-full w-80 max-w-full bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl border-l border-blue-100 dark:border-gray-800 shadow-2xl z-50 transition-transform duration-300 rounded-l-2xl overflow-hidden">
      <!-- Header -->
      <header class="p-5 border-b border-blue-100 dark:border-gray-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="inline-block w-7 h-7">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-blue-600 dark:text-yellow-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a2.25 2.25 0 01-4.714 0M6.75 8.25a5.25 5.25 0 1110.5 0c0 7.25 3 7.25 3 7.25H3.75s3-0.001 3-7.25z" />
            </svg>
          </span>
          <h2 class="text-xl font-bold text-gray-900 dark:text-yellow-300 tracking-tight">Notifications</h2>
        </div>
        <button (click)="closePanel()" class="text-gray-400 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 text-3xl p-1 rounded-full focus:outline-none transition-colors duration-200">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-7 h-7"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </header>
      <!-- Notifications List -->
      <main class="overflow-y-auto h-[calc(100%-4.5rem)] custom-scrollbar px-2 py-3">
        <ul class="flex flex-col gap-4">
          <li *ngFor="let notification of pagedNotifications" (click)="showNotificationModal(notification)"
              [class.bg-blue-50]="!notification.read" [class.dark:bg-gray-800]="!notification.read"
              class="rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-yellow-900/20 transition-shadow cursor-pointer px-4 py-3 flex flex-col gap-2 border border-transparent hover:border-blue-200 dark:hover:border-yellow-400 relative group">
            <div class="flex items-start gap-3 w-full">
              <span class="inline-block w-6 h-6 flex-shrink-0" [innerHTML]="getNotificationIcon(notification.type)"></span>
              <div class="flex-1 min-w-0">
                <h3 class="text-base font-semibold text-gray-900 dark:text-yellow-300 truncate">{{ notification.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-yellow-200 truncate">{{ notification.message }}</p>
                <time class="text-xs text-gray-500 dark:text-yellow-200/70 mt-1 block">{{ notification.time }}</time>
                <div *ngIf="notification.metadata && notification.metadata.company" class="mt-2">
                  <span class="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-xs text-blue-700 dark:text-blue-200 font-semibold shadow-sm truncate" title="{{ notification.metadata.company }}">{{ notification.metadata.company }}</span>
                  <span *ngIf="notification.metadata.status" class="inline-flex items-center justify-center gap-1 mt-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 shadow-sm">{{ getStatusLabel(notification.metadata.status || '') }}</span>
                </div>
              </div>
              <div *ngIf="!notification.read" class="flex-shrink-0 mt-1">
                <div class="w-2.5 h-2.5 rounded-full bg-pink-500 group-hover:scale-125 transition-transform"></div>
              </div>
            </div>
            <button (click)="deleteNotification(notification)" class="text-gray-400 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 text-xs p-1 rounded-full focus:outline-none transition-colors duration-200">Delete</button>
          </li>
        </ul>
        <div *ngIf="loadedCount < notifications.length" class="flex justify-center py-4">
          <button (click)="loadMore()" class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300 transition">Load More</button>
        </div>
        <div *ngIf="notifications.length === 0" class="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
          <span class="inline-block w-10 h-10 mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-10 h-10"><path d="M18.364 5.636A9 9 0 005.636 18.364M1 1l22 22"/></svg>
          </span>
          <p>No notifications</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e0e7ef; border-radius: 8px; }
    .custom-scrollbar.dark::-webkit-scrollbar-thumb { background: #2d3748; }
    .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e0e7ef #fff; }
    .dark .custom-scrollbar { scrollbar-color: #2d3748 #1a202c; }
    .animate-fadeIn { animation: fadeIn 0.25s cubic-bezier(0.4,0,0.2,1); }
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
    .glass-modal { box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); border: 1px solid rgba(255,255,255,0.18); }
  `]
})
export class NotificationPanelComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
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
    },
    // Additional mock notifications for pagination
    {
      id: 5,
      type: NotificationType.NEW_MESSAGE,
      title: 'New Message',
      message: 'You have a new message from Tesla recruiter.',
      time: '6 hours ago',
      read: false,
      metadata: {
        company: 'Tesla',
        jobTitle: 'Backend Engineer'
      }
    },
    {
      id: 6,
      type: NotificationType.SYSTEM_ALERT,
      title: 'System Maintenance',
      message: 'The system will be down for maintenance at midnight.',
      time: '8 hours ago',
      read: true,
      metadata: {
        company: 'VoltStack'
      }
    },
    {
      id: 7,
      type: NotificationType.ERROR,
      title: 'Error Detected',
      message: 'There was an error processing your application.',
      time: '10 hours ago',
      read: false,
      metadata: {
        company: 'Meta',
        status: 'REJECTED'
      }
    },
    {
      id: 8,
      type: NotificationType.INFO,
      title: 'Info Update',
      message: 'Your profile was viewed by a recruiter.',
      time: '12 hours ago',
      read: true,
      metadata: {
        company: 'LinkedIn'
      }
    },
    {
      id: 9,
      type: NotificationType.MANUAL_NOTE,
      title: 'Manual Note',
      message: 'Remember to update your resume.',
      time: '1 day ago',
      read: false,
      metadata: {
        company: 'Personal'
      }
    },
    {
      id: 10,
      type: NotificationType.APPLICATION_SUBMITTED,
      title: 'Application Submitted',
      message: 'Your application to SpaceX has been submitted',
      time: '2 days ago',
      read: true,
      metadata: {
        company: 'SpaceX',
        jobTitle: 'DevOps Engineer'
      }
    }
  ];

  // Pagination for notifications
  pageSize = 5;
  loadedCount = 5;
  get pagedNotifications() {
    return this.notifications.slice(0, this.loadedCount);
  }
  loadMore() {
    this.loadedCount = Math.min(this.loadedCount + this.pageSize, this.notifications.length);
  }

  // Modal logic for notification details
  notificationModalVisible = false;
  selectedNotification: Notification | null = null;
  showNotificationModal(notification: Notification) {
    this.selectedNotification = notification;
    this.notificationModalVisible = true;
    if (!notification.read) {
      this.markAsRead(notification);
    }
  }
  closeNotificationModal() {
    this.notificationModalVisible = false;
    this.selectedNotification = null;
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      APPLIED: 'Applied',
      INTERVIEW: 'Interview',
      OFFER: 'Offer',
      ACCEPTED: 'Accepted',
      REJECTED: 'Rejected',
      ON_HOLD: 'On Hold',
      PENDING: 'Pending',
      FOLLOW_UP: 'Follow Up',
      ARCHIVED: 'Archived'
    };
    return map[status] || status;
  }

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

  closePanel(): void {
    this.notificationModalVisible = false;
    this.selectedNotification = null;
    this.close.emit();
  }

  deleteNotification(notification: Notification) {
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
    // If modal is open for this notification, close it
    if (this.selectedNotification?.id === notification.id) {
      this.closeNotificationModal();
    }
  }
} 