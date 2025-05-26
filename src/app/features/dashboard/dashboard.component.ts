import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar.component';
import { FooterComponent } from '../../shared/components/footer.component';
import { ApplicationListComponent } from './application-list.component';
import { NotificationPanelComponent } from '../../shared/components/notification-panel.component';
import { ApplicationService } from './application.service';
import { ThemeService } from '../../shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent, 
    FooterComponent, 
    ApplicationListComponent, 
    NotificationPanelComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <app-navbar (openNotifications)="notificationPanelVisible = true"></app-navbar>
      <div class="flex-1 pt-20 max-w-5xl mx-auto w-full px-4 relative">
        <h1 class="text-3xl font-bold dark:text-yellow-300 text-gray-900 text-center w-full mb-6">My Applications</h1>
        <app-application-list [userId]="userId" [showAddButton]="true"></app-application-list>
      </div>
      <app-notification-panel *ngIf="notificationPanelVisible" (close)="notificationPanelVisible = false"></app-notification-panel>
      <app-footer></app-footer>
    </div>
  `,
  providers: [ApplicationService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userId!: number;
  notificationPanelVisible = false;
  private themeSubscription: Subscription;

  constructor(
    private appService: ApplicationService, 
    @Inject(PLATFORM_ID) private platformId: Object, 
    public theme: ThemeService
  ) {
    this.themeSubscription = this.theme.isDarkMode$.subscribe(isDark => {
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.classList.toggle('dark', isDark);
      }
    });
  }

  ngOnInit() {
    this.userId = this.getUserId();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  getUserId(): number {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).id : 1;
    } else {
      return 1;
    }
  }
} 