import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar.component';
import { FooterComponent } from '../shared/components/footer.component';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navbar></app-navbar>
      <div class="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 px-4">
        <div class="text-center max-w-lg w-full">
          <h1 class="text-7xl font-extrabold text-red-600 dark:text-yellow-400 mb-4 drop-shadow-lg">403</h1>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-yellow-300 mb-2">Access Forbidden</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">You do not have permission to view this page.</p>
          <a routerLink="/" class="inline-block px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-500 transition dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400">Go Home</a>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class ForbiddenComponent {} 