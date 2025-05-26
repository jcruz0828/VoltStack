import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

interface Notification {
  id: number;
  type: string;
  message: string;
  applicationId: number;
  company: string;
  jobTitle: string;
  oldStatus?: string;
  newStatus?: string;
  createdAt: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}`;
  private notificationSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationSubject.asObservable();
  private pollingInterval = 30000; // 30 seconds

  constructor(private http: HttpClient) {}

  // Start polling for updates
  startPolling(userId: number) {
    return interval(this.pollingInterval).pipe(
      switchMap(() => this.fetchUpdates(userId))
    ).subscribe();
  }

  // Fetch application updates and notifications
  private fetchUpdates(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/applications/updates/${userId}`).pipe(
      tap(updates => {
        if (updates && updates.length > 0) {
          this.notificationSubject.next(updates);
        }
      })
    );
  }

  // Get notification history
  getNotificationHistory(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications/${userId}`);
  }

  // Mark notification as read
  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${notificationId}/read`, {});
  }
} 