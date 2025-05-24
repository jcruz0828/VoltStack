import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from '../../../shared/components/navbar.component';
import { FooterComponent } from '../../../shared/components/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navbar></app-navbar>
      <div class="flex-1 pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg mt-20 dark:bg-gray-900 dark:border dark:border-gray-800" [@fadeInUp]>
          <!-- Header -->
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-yellow-300">Welcome Back</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">Sign in to your account</p>
          </div>

          <!-- Login Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input id="email" type="email" formControlName="email" placeholder="Enter your email"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
              <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid" class="text-sm text-red-600 mt-1">
                <span *ngIf="loginForm.get('email')?.hasError('required')">Email is required</span>
                <span *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email</span>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div class="relative">
                <input id="password" [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Enter your password"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none pr-12 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                <button type="button" (click)="hidePassword = !hidePassword" tabindex="-1"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none">
                  <span *ngIf="hidePassword">Show</span>
                  <span *ngIf="!hidePassword">Hide</span>
                </button>
              </div>
              <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid" class="text-sm text-red-600 mt-1">
                <span *ngIf="loginForm.get('password')?.hasError('required')">Password is required</span>
                <span *ngIf="loginForm.get('password')?.hasError('minlength')">Password must be at least 8 characters</span>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 rounded">
                <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">Remember me</label>
              </div>
              <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>

            <div>
              <button type="submit" class="w-full py-3 text-lg rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400" [disabled]="loginForm.invalid || isLoading">
                <span *ngIf="isLoading">Loading...</span>
                <span *ngIf="!isLoading">Sign In</span>
              </button>
            </div>
          </form>

          <!-- Register Link -->
          <div class="text-center mt-6">
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Don't have an account?
              <a routerLink="/auth/register" class="font-medium text-blue-600 hover:text-blue-500 dark:text-yellow-400 dark:hover:text-yellow-300">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  public currentYear = new Date().getFullYear();
  isDarkMode$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    public theme: ThemeService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.isDarkMode$ = this.theme.isDarkMode$;
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 100);
    }
  }

  toggleDarkMode() {
    this.theme.toggleDarkMode();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(
            error.error?.message || 'An error occurred during login',
            'Close',
            { duration: 5000 }
          );
        }
      });
    }
  }
} 