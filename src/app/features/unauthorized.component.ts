import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar.component';
import { FooterComponent } from '../shared/components/footer.component';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navbar></app-navbar>
      <div class="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 px-4">
        <div class="text-center max-w-lg w-full">
          <h1 class="text-7xl font-extrabold text-yellow-500 dark:text-yellow-400 mb-4 drop-shadow-lg">401</h1>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-yellow-300 mb-2">Not Authorized</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">You must be logged in to view this page.</p>
          <a routerLink="/auth/login" class="inline-block px-8 py-3 bg-yellow-500 text-white font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400">Go to Login</a>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class UnauthorizedComponent {} 