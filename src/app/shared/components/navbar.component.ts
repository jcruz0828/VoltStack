import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" class="fixed top-0 left-0 w-full z-10 !bg-white/70 !backdrop-blur-md shadow-lg border-b border-blue-100 dark:!bg-gray-900/70 dark:border-gray-800">
      <div class="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
        <a routerLink="/" class="flex items-center space-x-2 group no-underline">
          <svg class="text-3xl !text-yellow-500 w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          <span class="text-2xl font-extrabold tracking-tight text-blue-900 group-hover:text-blue-900 transition dark:text-yellow-300 dark:group-hover:text-yellow-200">VoltStack</span>
        </a>
        <div class="flex items-center space-x-2">
          <ng-container *ngIf="(auth.currentUser$ | async) as user; else guestLinks">
            <button mat-button [matMenuTriggerFor]="userMenu" class="flex items-center gap-2 font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg px-3 py-2">
              <span class="text-blue-900 dark:text-yellow-200">{{ user.email }}</span>
            </button>
            <mat-menu #userMenu="matMenu">
              <button mat-menu-item (click)="theme.toggleDarkMode()">
                <span class="flex items-center gap-2">
                  <ng-container *ngIf="!(isDarkMode$ | async); else moonIcon">
                    <!-- Sun SVG -->
                    <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m9-9h-2M5 12H3m15.07 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
                  </ng-container>
                  <ng-template #moonIcon>
                    <!-- Moon SVG -->
                    <svg class="w-5 h-5 text-yellow-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
                  </ng-template>
                  <span>Toggle Theme</span>
                </span>
              </button>
              <button mat-menu-item (click)="auth.logout()">
                <span class="flex items-center gap-2">
                  <!-- Logout SVG -->
                  <svg class="w-5 h-5 text-white dark:text-yellow-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"/></svg>
                  <span>Logout</span>
                </span>
              </button>
            </mat-menu>
          </ng-container>
          <ng-template #guestLinks>
            <button mat-icon-button (click)="theme.toggleDarkMode()" [attr.aria-label]="(isDarkMode$ | async) ? 'Switch to light mode' : 'Switch to dark mode'">
              <ng-container *ngIf="!(isDarkMode$ | async); else moonIconGuest">
                <!-- Sun SVG -->
                <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m9-9h-2M5 12H3m15.07 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
              </ng-container>
              <ng-template #moonIconGuest>
                <!-- Moon SVG -->
                <svg class="w-6 h-6 text-yellow-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
              </ng-template>
            </button>
            <a mat-stroked-button color="primary" routerLink="/auth/login" class="font-semibold text-blue-900 dark:!border-yellow-400 dark:!text-yellow-200 dark:hover:!bg-gray-800 dark:hover:!border-yellow-300">Login</a>
            <a mat-raised-button color="primary" routerLink="/auth/register" class="font-semibold text-white dark:!bg-yellow-400 dark:!text-gray-900 dark:hover:!bg-yellow-300">Register</a>
          </ng-template>
        </div>
      </div>
    </mat-toolbar>
  `
})
export class NavbarComponent implements OnInit {
  isDarkMode$;
  constructor(public theme: ThemeService, public auth: AuthService) {
    this.isDarkMode$ = this.theme.isDarkMode$;
  }
  ngOnInit() {}
} 