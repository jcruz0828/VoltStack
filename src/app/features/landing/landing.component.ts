import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from '../../shared/components/navbar.component';
import { FooterComponent } from '../../shared/components/footer.component';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatDividerModule,
    NavbarComponent, FooterComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navbar></app-navbar>
      <div class="flex-1 pt-20 relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 overflow-x-hidden">
        <!-- Animated Background Circles -->
        <div class="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl animate-pulse dark:bg-blue-900"></div>
        <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl animate-pulse dark:bg-purple-900"></div>
        <!-- Hero Section -->
        <div class="flex flex-col items-center justify-center pt-40 pb-20 px-4">
          <mat-card class="w-full max-w-3xl text-center bg-white/90 shadow-2xl rounded-3xl p-12 border border-blue-100 dark:bg-gray-900/90 dark:border-gray-800">
            <h1 class="text-6xl font-extrabold text-gray-900 dark:text-yellow-300 mb-4 leading-tight tracking-tight drop-shadow-lg">
              Supercharge Your <span class="text-blue-600 dark:text-yellow-400">Engineering</span> Job Search
            </h1>
            <p class="text-2xl text-blue-700 font-semibold mb-6">The all-in-one tracker for electrical, computer, and software engineers</p>
            <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Organize applications, set reminders, and get insights—VoltStack helps you land your next role with confidence.
            </p>
            <div class="space-x-4">
              <a mat-raised-button color="primary" routerLink="/auth/register"
                 class="text-lg px-8 py-3 font-bold shadow-lg rounded-xl">Start Free Trial</a>
              <a mat-stroked-button color="primary" routerLink="/auth/login"
                 class="text-lg px-8 py-3 font-bold rounded-xl">Sign In</a>
            </div>
          </mat-card>
        </div>
        <!-- Features Section -->
        <div class="grid md:grid-cols-3 gap-8 mb-16 w-full max-w-6xl mx-auto px-4">
          <mat-card class="rounded-2xl shadow-xl p-8 flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 transition-transform hover:-translate-y-2 duration-300 dark:from-gray-800 dark:to-gray-900 dark:hover:from-gray-700 dark:hover:to-gray-800" [@fadeInUp]="'0.2s'">
            <svg class="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18"/><rect x="7" y="13" width="3" height="5" rx="1"/><rect x="12" y="9" width="3" height="9" rx="1"/><rect x="17" y="5" width="3" height="13" rx="1"/></svg>
            <h3 class="text-2xl font-bold mb-2 text-blue-900">Track Applications</h3>
            <p class="text-gray-600 text-center">Centralize all your job applications and never lose track of your progress.</p>
          </mat-card>
          <mat-card class="rounded-2xl shadow-xl p-8 flex flex-col items-center bg-gradient-to-br from-purple-100 to-blue-50 hover:from-purple-200 hover:to-blue-100 transition-transform hover:-translate-y-2 duration-300 dark:from-gray-800 dark:to-gray-900 dark:hover:from-gray-700 dark:hover:to-gray-800" [@fadeInUp]="'0.4s'">
            <svg class="w-12 h-12 text-purple-600 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <h3 class="text-2xl font-bold mb-2 text-purple-900">Smart Reminders</h3>
            <p class="text-gray-600 text-center">Get notified for follow-ups, interviews, and deadlines—never miss an opportunity.</p>
          </mat-card>
          <mat-card class="rounded-2xl shadow-xl p-8 flex flex-col items-center bg-gradient-to-br from-blue-100 to-purple-50 hover:from-blue-200 hover:to-purple-100 transition-transform hover:-translate-y-2 duration-300 dark:from-gray-800 dark:to-gray-900 dark:hover:from-gray-700 dark:hover:to-gray-800" [@fadeInUp]="'0.6s'">
            <svg class="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929"/></svg>
            <h3 class="text-2xl font-bold mb-2 text-blue-900">Insightful Analytics</h3>
            <p class="text-gray-600 text-center">Visualize your job search stats and optimize your strategy for success.</p>
          </mat-card>
        </div>
        <!-- Stats Section -->
        <div class="w-full max-w-5xl mx-auto px-4 mb-16">
          <div class="grid md:grid-cols-4 gap-8">
            <mat-card class="rounded-2xl shadow-lg p-6 flex flex-col items-center bg-white/90 border border-blue-100 dark:bg-gray-900/90 dark:border-gray-800">
              <svg class="w-10 h-10 text-blue-600 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7.13a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              <div class="text-4xl font-bold text-blue-600 mb-1">10K+</div>
              <div class="text-gray-600">Active Engineers</div>
            </mat-card>
            <mat-card class="rounded-2xl shadow-lg p-6 flex flex-col items-center bg-white/90 border border-blue-100 dark:bg-gray-900/90 dark:border-gray-800">
              <svg class="w-10 h-10 text-blue-600 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 7V6a2 2 0 012-2h8a2 2 0 012 2v1M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7M6 7h12"/></svg>
              <div class="text-4xl font-bold text-blue-600 mb-1">50K+</div>
              <div class="text-gray-600">Applications Tracked</div>
            </mat-card>
            <mat-card class="rounded-2xl shadow-lg p-6 flex flex-col items-center bg-white/90 border border-blue-100 dark:bg-gray-900/90 dark:border-gray-800">
              <svg class="w-10 h-10 text-blue-600 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/></svg>
              <div class="text-4xl font-bold text-blue-600 mb-1">85%</div>
              <div class="text-gray-600">Success Rate</div>
            </mat-card>
            <mat-card class="rounded-2xl shadow-lg p-6 flex flex-col items-center bg-white/90 border border-blue-100 dark:bg-gray-900/90 dark:border-gray-800">
              <svg class="w-10 h-10 text-blue-600 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 10c0-3.866-3.582-7-8-7S2 6.134 2 10c0 3.866 3.582 7 8 7s8-3.134 8-7z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <div class="text-4xl font-bold text-blue-600 mb-1">24/7</div>
              <div class="text-gray-600">Support</div>
            </mat-card>
          </div>
        </div>
        <!-- CTA Section -->
        <div class="flex flex-col items-center justify-center mb-24 px-4">
          <mat-card class="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl shadow-2xl w-full max-w-3xl dark:from-gray-800 dark:to-gray-900 dark:text-yellow-300">
            <h2 class="text-4xl font-bold mb-4">Ready to electrify your job search?</h2>
            <p class="text-xl mb-8 opacity-90">Join thousands of engineers using VoltStack to power their careers.</p>
            <a mat-raised-button color="accent" routerLink="/auth/register"
               class="text-lg px-8 py-3 bg-white text-blue-600 font-bold hover:bg-blue-50 transition rounded-xl">Start Free Trial</a>
          </mat-card>
        </div>
        <mat-divider></mat-divider>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {
  public currentYear = new Date().getFullYear();
  isDarkMode$;
  constructor(public theme: ThemeService) {
    this.isDarkMode$ = this.theme.isDarkMode$;
  }
  ngOnInit() {}
  toggleDarkMode() {
    this.theme.toggleDarkMode();
  }
}