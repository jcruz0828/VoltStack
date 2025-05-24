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
  selector: 'app-register',
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
      <div class="flex-1 pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg mt-20 dark:bg-gray-900 dark:border dark:border-gray-800" [@fadeInUp]>
          <!-- Header -->
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-yellow-300">Create Account</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">Join our community of job seekers</p>
          </div>

          <!-- Register Form -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                <input id="firstName" type="text" formControlName="firstName" placeholder="Enter your first name"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                <div *ngIf="registerForm.get('firstName')?.touched && registerForm.get('firstName')?.invalid" class="text-sm text-red-600 mt-1">
                  <span *ngIf="registerForm.get('firstName')?.hasError('required')">First name is required</span>
                </div>
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                <input id="lastName" type="text" formControlName="lastName" placeholder="Enter your last name"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                <div *ngIf="registerForm.get('lastName')?.touched && registerForm.get('lastName')?.invalid" class="text-sm text-red-600 mt-1">
                  <span *ngIf="registerForm.get('lastName')?.hasError('required')">Last name is required</span>
                </div>
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input id="email" type="email" formControlName="email" placeholder="Enter your email"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
              <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid" class="text-sm text-red-600 mt-1">
                <span *ngIf="registerForm.get('email')?.hasError('required')">Email is required</span>
                <span *ngIf="registerForm.get('email')?.hasError('email')">Please enter a valid email</span>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div class="relative">
                <input id="password" [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Create a password"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none pr-12 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
                <button type="button" (click)="hidePassword = !hidePassword" tabindex="-1"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none">
                  <span *ngIf="hidePassword">Show</span>
                  <span *ngIf="!hidePassword">Hide</span>
                </button>
              </div>
              <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" class="text-sm text-red-600 mt-1">
                <span *ngIf="registerForm.get('password')?.hasError('required')">Password is required</span>
                <span *ngIf="registerForm.get('password')?.hasError('minlength')">Password must be at least 8 characters</span>
                <span *ngIf="registerForm.get('password')?.hasError('pattern')">Password must contain at least one uppercase letter, one lowercase letter, and one number</span>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input id="confirmPassword" [type]="hidePassword ? 'password' : 'text'" formControlName="confirmPassword" placeholder="Confirm your password"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
              <div *ngIf="registerForm.get('confirmPassword')?.touched && registerForm.get('confirmPassword')?.invalid" class="text-sm text-red-600 mt-1">
                <span *ngIf="registerForm.get('confirmPassword')?.hasError('required')">Please confirm your password</span>
                <span *ngIf="registerForm.get('confirmPassword')?.hasError('passwordMismatch')">Passwords do not match</span>
              </div>
            </div>

            <div>
              <button type="submit" class="w-full py-3 text-lg rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400" [disabled]="registerForm.invalid || isLoading">
                <span *ngIf="isLoading">Loading...</span>
                <span *ngIf="!isLoading">Create Account</span>
              </button>
            </div>
          </form>

          <!-- Login Link -->
          <div class="text-center mt-4">
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?
              <a routerLink="/auth/login" class="font-medium text-blue-600 hover:text-blue-500 dark:text-yellow-400 dark:hover:text-yellow-300">
                Sign in
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
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  isDarkMode$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    public theme: ThemeService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
    this.isDarkMode$ = this.theme.isDarkMode$;
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  toggleDarkMode() {
    this.theme.toggleDarkMode();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { firstName, lastName, email, password } = this.registerForm.value;

      this.authService.register(firstName, lastName, email, password).subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 100);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(
            error.error?.message || 'An error occurred during registration',
            'Close',
            { duration: 5000 }
          );
        }
      });
    }
  }
} 