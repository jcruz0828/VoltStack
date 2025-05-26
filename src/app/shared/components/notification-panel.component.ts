import { Component, OnInit, Output, EventEmitter, PLATFORM_ID, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotificationPollingService } from '../services/notification-polling.service';
import { NotificationService } from '../../core/services/notification.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  channel: 'IN_APP' | 'EMAIL' | 'SMS';
  applicationId?: number;
  metadata?: {
    company?: string;
    jobTitle?: string;
    status?: string;
  };
  title?: string;
  time?: string;
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
  providers: [NotificationPollingService, NotificationService],
  animations: [
    trigger('slideFadeIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ]),
    trigger('rotateIn', [
      transition(':enter', [
        style({ transform: 'rotate(-180deg)', opacity: 0 }),
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'rotate(0)', opacity: 1 }))
      ])
    ])
  ],
  template: `
    <!-- Notification Details Modal -->
    <div *ngIf="notificationModalVisible" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div [@fadeInOut] class="bg-white dark:bg-gray-900 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-blue-100/50 dark:border-gray-700/50 relative flex flex-col items-start gap-4 transition-all duration-300 glass-modal">
        <button (click)="closeNotificationModal()" [@rotateIn] class="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-3xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-full w-10 h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 shadow-md hover:shadow-lg hover:scale-110">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 class="text-3xl font-extrabold mb-2 text-blue-900 dark:text-yellow-300 tracking-tight">{{ selectedNotification?.title }}</h2>
        <div class="mb-2 text-gray-700 dark:text-yellow-200 text-lg">{{ selectedNotification?.message }}</div>
        <div *ngIf="selectedNotification?.metadata" class="mb-2 flex flex-wrap gap-2">
          <span *ngIf="selectedNotification?.metadata?.company" class="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-sm text-blue-700 dark:text-blue-200 font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 truncate" title="{{ selectedNotification?.metadata?.company }}">{{ selectedNotification?.metadata?.company }}</span>
          <span *ngIf="selectedNotification?.metadata?.status" class="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 shadow-sm hover:shadow-md hover:scale-105">{{ getStatusLabel(selectedNotification?.metadata?.status || '') }}</span>
        </div>
        <div class="text-xs text-gray-500 dark:text-yellow-400/70 mt-2">{{ selectedNotification?.time }}</div>
      </div>
    </div>

    <!-- Sidebar Panel -->
    <div class="fixed right-0 top-0 h-full w-80 max-w-full z-50 rounded-l-2xl overflow-hidden"
         [@slideFadeIn]>
      <div class="h-full w-full bg-white dark:bg-gray-900 backdrop-blur-xl border-l border-blue-100/50 dark:border-gray-800/50 shadow-2xl transition-transform duration-300 rounded-l-2xl flex flex-col">
        <!-- Header -->
        <header class="p-5 border-b border-blue-100/50 dark:border-gray-800/50 flex items-center justify-between bg-transparent">
          <div class="flex items-center gap-3">
            <span class="inline-block w-7 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-blue-600 dark:text-yellow-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a2.25 2.25 0 01-4.714 0M6.75 8.25a5.25 5.25 0 1110.5 0c0 7.25 3 7.25 3 7.25H3.75s3-0.001 3-7.25z" />
              </svg>
            </span>
            <h2 class="text-xl font-bold text-gray-900 dark:text-yellow-300 tracking-tight">Notifications</h2>
          </div>
          <button (click)="closePanel()" [@rotateIn] class="text-gray-400 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 text-3xl p-1 rounded-full focus:outline-none transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-7 h-7"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </header>

        <!-- Notifications List -->
        <main class="overflow-y-auto h-[calc(100%-4.5rem)] custom-scrollbar px-2 py-3 bg-transparent">
          <ul class="flex flex-col gap-4">
            <ng-container *ngFor="let notification of pagedNotifications; let last = last">
              <li (click)="showNotificationModal(notification)"
                  [class.bg-white]="!notification.read"
                  [class.bg-blue-50]="notification.read"
                  [class.dark:bg-gray-900]="!notification.read"
                  [class.dark:bg-gray-800]="notification.read"
                  class="rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100/50 dark:border-gray-800/50 backdrop-blur-md transition-all duration-300 cursor-pointer px-6 py-5 flex flex-row items-center gap-4 relative group notification-card mb-2 hover:scale-[1.02] hover:bg-white/95 dark:hover:bg-gray-900/95">
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="inline-block w-7 h-7 flex-shrink-0" [innerHTML]="getNotificationIcon(notification.type)"></span>
                    <span class="text-base font-semibold text-gray-900 dark:text-yellow-300 truncate">{{ notification.title || 'Notification' }}</span>
                    <span *ngIf="notification.priority === 'HIGH'" class="ml-2 px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-200 text-xs font-bold uppercase shadow-sm">High</span>
                    <span *ngIf="notification.priority === 'MEDIUM'" class="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200 text-xs font-bold uppercase shadow-sm">Medium</span>
                    <span *ngIf="notification.priority === 'LOW'" class="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800/40 dark:text-gray-300 text-xs font-bold uppercase shadow-sm">Low</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-2 mb-1">
                    <span *ngIf="notification.metadata && notification.metadata.company" class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-xs text-blue-700 dark:text-blue-200 font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 truncate" title="{{ notification.metadata.company }}">{{ notification.metadata.company || '' }}</span>
                    <span *ngIf="notification.metadata && notification.metadata.jobTitle" class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-xs text-purple-700 dark:text-purple-200 font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 truncate" title="{{ notification.metadata.jobTitle }}">{{ notification.metadata.jobTitle || '' }}</span>
                    <span *ngIf="notification.metadata && notification.metadata.status" class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-xs text-green-700 dark:text-green-200 font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 truncate">{{ getStatusLabel(notification.metadata.status || '') }}</span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-yellow-200/90 truncate mb-1">{{ notification.message }}</p>
                  <time class="text-xs text-gray-500 dark:text-yellow-200/70">{{ notification.time }}</time>
                </div>
                <button (click)="deleteNotification(notification); $event.stopPropagation();" title="Delete notification"
                  class="absolute top-3 right-3 text-gray-400 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 text-lg p-1 rounded-full focus:outline-none transition-all duration-300 hover:scale-110 hover:shadow-lg z-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div *ngIf="!notification.read" class="absolute -top-2 -left-2 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-white dark:border-gray-900 shadow-lg"></div>
                <div *ngIf="!notification.read" class="sr-only">Unread</div>
              </li>
              <hr *ngIf="!last" class="border-blue-100/50 dark:border-gray-800/50 my-2" />
            </ng-container>
          </ul>

          <!-- Load More Button -->
          <div *ngIf="loadedCount < internalNotifications.length" class="flex justify-center py-4">
            <button (click)="loadMore()" class="px-4 py-2 rounded-lg bg-blue-600 dark:bg-yellow-400 text-white dark:text-gray-900 font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">Load More</button>
          </div>

          <!-- Empty State -->
          <div *ngIf="!internalNotifications || internalNotifications.length === 0" class="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
            <span class="inline-block w-10 h-10 mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-10 h-10"><path d="M18.364 5.636A9 9 0 005.636 18.364M1 1l22 22"/></svg>
            </span>
            <p>No notifications found.</p>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e0e7ef; border-radius: 8px; }
    .custom-scrollbar.dark::-webkit-scrollbar-thumb { background: #2d3748; }
    .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e0e7ef #fff; }
    .dark .custom-scrollbar { scrollbar-color: #2d3748 #1a202c; }
    .glass-modal { 
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      border: 1px solid rgba(255,255,255,0.18);
      backdrop-filter: blur(8px);
    }
    .notification-card { 
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      backdrop-filter: blur(8px);
    }
    .notification-card:hover { 
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
      transform: translateY(-2px);
    }
    .dark .notification-card:hover { 
      background: rgba(30,41,59,0.95);
    }
    @keyframes fadeIn { 
      from { opacity: 0; transform: scale(0.98); } 
      to { opacity: 1; transform: scale(1); } 
    }
  `]
})
export class NotificationPanelComponent implements OnInit, OnChanges {
  @Output() close = new EventEmitter<void>();
  @Input() notifications: Notification[] = [];
  internalNotifications: Notification[] = [];
  pageSize = 5;
  loadedCount = 5;
  notificationModalVisible = false;
  selectedNotification: Notification | null = null;
  isBrowser: boolean;

  constructor(
    private notifPolling: NotificationPollingService,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    const userId = this.getUserId();
    this.notificationService.getNotifications(userId).subscribe({
      next: (notifs) => {
        this.internalNotifications = notifs.map((notif: any) => ({
          id: notif.id,
          type: notif.type,
          message: notif.message,
          timestamp: notif.timestamp || notif.createdAt || '',
          read: notif.read,
          priority: notif.priority || 'MEDIUM',
          channel: notif.channel || 'IN_APP',
          applicationId: notif.applicationId,
          metadata: {
            company: notif.company || '',
            jobTitle: notif.jobTitle || '',
            status: notif.newStatus || ''
          },
          title: this.generateTitle(notif),
          time: this.formatTimestamp(notif.timestamp || notif.createdAt)
        }));
      },
      error: () => {
        this.internalNotifications = [];
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notifications'] && this.notifications) {
      this.setInternalNotifications(this.notifications);
    }
  }

  private setInternalNotifications(notifs: any[]): void {
    if (notifs && notifs.length > 0) {
      this.internalNotifications = notifs.map((notif: any) => {
        const mapped: Notification = {
          id: notif.id,
          type: notif.type,
          message: notif.message,
          timestamp: notif.timestamp || notif.createdAt || '',
          read: notif.read,
          priority: notif.priority || 'MEDIUM',
          channel: notif.channel || 'IN_APP',
          applicationId: notif.applicationId,
          metadata: {
            company: notif.company,
            jobTitle: notif.jobTitle,
            status: notif.newStatus || ''
          },
          title: this.generateTitle(notif),
          time: this.formatTimestamp(notif.timestamp || notif.createdAt)
        };
        return mapped;
      });
    } else {
      this.internalNotifications = [];
    }
  }

  private getUserId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          return JSON.parse(user).id || 6;
        } catch {
          return 6;
        }
      }
    }
    return 6;
  }

  private formatTimestamp(timestamp: string): string {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (error) {
      return timestamp;
    }
  }

  private generateTitle(notification: any): string {
    switch (notification.type) {
      case 'STATUS_UPDATE':
        return 'Status Update';
      case 'NEW_MESSAGE':
        return 'New Message';
      case 'REMINDER':
        return 'Reminder';
      case 'FEEDBACK_RECEIVED':
        return 'Feedback Received';
      case 'APPLICATION_SUBMITTED':
        return 'Application Submitted';
      case 'MANUAL_NOTE':
        return 'Manual Note';
      case 'SYSTEM_ALERT':
        return 'System Alert';
      case 'ERROR':
        return 'Error';
      case 'INFO':
        return 'Information';
      default:
        return 'Notification';
    }
  }

  get pagedNotifications() {
    return this.internalNotifications.slice(0, this.loadedCount);
  }

  loadMore() {
    this.loadedCount = Math.min(this.loadedCount + this.pageSize, this.internalNotifications.length);
  }

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

  markAsRead(notification: Notification): void {
    if (!notification.read) {
      notification.read = true;
      const userId = this.getUserId();
      this.notificationService.markAsRead(notification.id, userId).subscribe();
    }
  }

  deleteNotification(notification: Notification) {
    const userId = this.getUserId();
    this.notificationService.deleteNotification(notification.id, userId).subscribe(() => {
      this.internalNotifications = this.internalNotifications.filter(n => n.id !== notification.id);
      if (this.selectedNotification?.id === notification.id) {
        this.closeNotificationModal();
      }
    });
  }

  getNotificationIcon(type: string): SafeHtml {
    let svgContent = '';
    switch (type) {
      case 'STATUS_UPDATE':
        svgContent = `<svg viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="10" fill="#ECFDF5"/><path d="M9 12l2 2l4-4"/></svg>`;
        break;
      case 'NEW_MESSAGE':
        svgContent = `<svg viewBox="0 0 20 20" fill="#8B5CF6"><path d="M2 4h16v12H2V4zm2 2v8h12V6H4zm2 2h8v4H6V8z"/></svg>`;
        break;
      case 'REMINDER':
        svgContent = `<svg viewBox="0 0 20 20" fill="#EC4899"><path d="M10 2v16M2 10h16" stroke="#EC4899" stroke-width="2"/></svg>`;
        break;
      case 'FEEDBACK_RECEIVED':
        svgContent = `<svg viewBox="0 0 20 20" fill="#22C55E"><path d="M10 2l2.5 7.5H20l-6.25 4.5 2.5 7.5L10 17l-6.25 4.5 2.5-7.5L0 9.5h7.5L10 2z"/></svg>`;
        break;
      case 'APPLICATION_SUBMITTED':
        svgContent = `<svg viewBox="0 0 20 20" fill="#3B82F6"><circle cx="10" cy="10" r="8"/></svg>`;
        break;
      case 'MANUAL_NOTE':
        svgContent = `<svg viewBox="0 0 20 20" fill="#F59E0B"><path d="M2 4h16v12H2V4zm2 2v8h12V6H4zm2 2h8v4H6V8z"/></svg>`;
        break;
      case 'SYSTEM_ALERT':
        svgContent = `<svg viewBox="0 0 20 20" fill="#6B7280"><path d="M10 2l8 16H2L10 2zm0 4v6m0 2v2"/></svg>`;
        break;
      case 'ERROR':
        svgContent = `<svg viewBox="0 0 20 20" fill="#EF4444"><path d="M10 2l8 16H2L10 2zm0 4v6m0 2v2"/></svg>`;
        break;
      case 'INFO':
        svgContent = `<svg viewBox="0 0 20 20" fill="#60A5FA"><circle cx="10" cy="10" r="8"/><path d="M9 7h2v2H9V7zm0 4h2v6H9v-6z"/></svg>`;
        break;
      default:
        svgContent = `<svg viewBox="0 0 20 20" fill="#6B7280"><circle cx="10" cy="10" r="8"/></svg>`;
    }
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }

  closePanel(): void {
    this.notificationModalVisible = false;
    this.selectedNotification = null;
    this.close.emit();
  }
} 