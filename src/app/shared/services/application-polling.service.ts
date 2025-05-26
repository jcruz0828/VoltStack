import { Injectable } from '@angular/core';
import { ApplicationService } from '../../features/dashboard/application.service';
import { BehaviorSubject, interval, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApplicationPollingService {
  private applications$ = new BehaviorSubject<any[] | null>(null);
  private lastHash: string | null = null;
  private pollingInterval = 60 * 1000; // 60 seconds

  constructor(private appService: ApplicationService) {}

  startPolling(userId: number) {
    interval(this.pollingInterval)
      .pipe(
        switchMap(() => {
          return this.fetchApplications(userId);
        })
      )
      .subscribe(apps => {
        if (apps) this.applications$.next(apps);
      });
  }

  getApplications() {
    return this.applications$.asObservable();
  }

  private fetchApplications(userId: number) {
    return this.appService.getApplicationsByUser(userId).pipe(
      switchMap((apps: any[]) => {
        const hash = this.hashApplications(apps);
        if (hash !== this.lastHash) {
          this.lastHash = hash;
          return of(apps);
        }
        return of(null); // No change
      })
    );
  }

  private hashApplications(apps: any[]): string {
    return btoa(JSON.stringify(apps));
  }
} 