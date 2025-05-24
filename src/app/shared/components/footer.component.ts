import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <footer class="w-full left-0 bg-white/90 dark:bg-gray-900/90 py-4 px-4 flex flex-col md:flex-row items-center justify-between text-gray-700 dark:text-yellow-200 text-sm mt-auto">
      <div class="flex items-center space-x-2 mb-2 md:mb-0">
        <svg class="text-2xl w-6 h-6 text-blue-900 dark:text-yellow-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <span class="font-bold text-blue-900 dark:text-yellow-300">VoltStack</span>
        <span class="ml-2 text-gray-700 dark:text-yellow-200">© {{ currentYear }}</span>
      </div>
      <div class="flex space-x-4 items-center">
        <ng-container *ngIf="(auth.currentUser$ | async) as user; else guestLinks">
          <a routerLink="/dashboard" class="hover:text-blue-900 dark:hover:text-yellow-400 font-semibold text-blue-900 dark:text-yellow-200">Dashboard</a>
          <button mat-button (click)="auth.logout()" class="font-semibold text-pink-600 dark:text-yellow-300">Logout</button>
        </ng-container>
        <ng-template #guestLinks>
          <a routerLink="/" class="hover:text-blue-900 dark:hover:text-yellow-400 text-blue-900 dark:text-yellow-200">Home</a>
          <a routerLink="/auth/login" class="hover:text-blue-900 dark:hover:text-yellow-400 text-blue-900 dark:text-yellow-200">Login</a>
          <a routerLink="/auth/register" class="hover:text-blue-900 dark:hover:text-yellow-400 text-blue-900 dark:text-yellow-200">Register</a>
        </ng-template>
      </div>
    </footer>
  `
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
  constructor(public auth: AuthService) {}
} 