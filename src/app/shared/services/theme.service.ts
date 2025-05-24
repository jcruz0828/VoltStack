import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark)) {
        this.setDarkMode(true, false);
      } else {
        this.setDarkMode(false, false);
      }
    }
  }

  setDarkMode(isDark: boolean, persist = true) {
    this.isDarkModeSubject.next(isDark);
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      if (persist) {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    }
  }

  toggleDarkMode() {
    this.setDarkMode(!this.isDarkModeSubject.value);
  }

  get isDarkMode() {
    return this.isDarkModeSubject.value;
  }
} 