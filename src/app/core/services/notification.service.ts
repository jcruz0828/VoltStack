import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
      switchMap(() => this.getNotifications(userId))
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

  // Get all notifications for a user
  getNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<{ data: Notification[] }>(`${this.apiUrl}/notifications/user/${userId}`)
      .pipe(
        map(response => {
          if (!response || !response.data) {
            return [];
          }
          return response.data;
        }),
        catchError(error => {
          return of([]);
        })
      );
  }

  // Mark one notification as read
  markAsRead(notificationId: number, userId: number): Observable<any> {
    return this.http.patch<{ data: any }>(`${this.apiUrl}/notifications/${notificationId}/read?userId=${userId}`, {})
      .pipe(
        map(res => res.data),
        catchError(() => of(null))
      );
  }

  // Mark all notifications as read for a user
  markAllAsRead(userId: number): Observable<any> {
    return this.http.patch<{ data: any }>(`${this.apiUrl}/notifications/user/${userId}/read-all`, {})
      .pipe(
        map(res => res.data),
        catchError(() => of(null))
      );
  }

  // Delete a notification
  deleteNotification(notificationId: number, userId: number): Observable<any> {
    return this.http.delete<{ data: any }>(`${this.apiUrl}/notifications/${notificationId}?userId=${userId}`)
      .pipe(
        map(res => res.data),
        catchError(() => of(null))
      );
  }
} 