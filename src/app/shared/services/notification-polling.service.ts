import { Injectable } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { BehaviorSubject, interval, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationPollingService {
  private notifications$ = new BehaviorSubject<any[]>([]); // Initialize with empty array instead of null
  private lastHash: string | null = null;
  private pollingInterval = 60 * 1000; // 60 seconds

  constructor(private notificationService: NotificationService) {}

  startPolling(userId: number) {
    // Initial fetch
    this.fetchNotifications(userId).subscribe();

    // Start polling
    interval(this.pollingInterval)
      .pipe(
        switchMap(() => {
          return this.fetchNotifications(userId);
        })
      )
      .subscribe();
  }

  getNotifications() {
    return this.notifications$.asObservable();
  }

  private fetchNotifications(userId: number) {
    return this.notificationService.getNotifications(userId).pipe(
      tap(notifs => {}),
      switchMap((notifs: any[]) => {
        if (!notifs) {
          return of([]);
        }
        const hash = this.generateHash(notifs);
        if (hash !== this.lastHash) {
          this.lastHash = hash;
          this.notifications$.next(notifs);
        }
        return of(notifs);
      }),
      catchError(error => {
        return of([]);
      })
    );
  }

  private generateHash(data: any): string {
    const jsonString = JSON.stringify(data);
    // Use encodeURIComponent to handle special characters before base64 encoding
    return btoa(encodeURIComponent(jsonString));
  }
} 