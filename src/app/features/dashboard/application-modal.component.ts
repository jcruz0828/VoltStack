import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, startWith, map } from 'rxjs/operators';
import { CompanyService, Company } from './company.service';

@Component({
  selector: 'app-application-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <div *ngIf="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div class="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 w-full max-w-xl border border-blue-100 dark:border-gray-700 relative backdrop-blur-xl transition-all">
        <button (click)="close.emit()" class="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-3xl transition-colors duration-200">
          <span class="material-icons">close</span>
        </button>
        <h2 class="text-3xl font-extrabold mb-6 text-blue-700 dark:text-yellow-300 tracking-tight text-center">{{ mode === 'create' ? 'Add Application' : 'Update Application' }}</h2>
        <form (ngSubmit)="onSave()" #appForm="ngForm" class="space-y-6">
          <div>
            <label class="block text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">Job Title</label>
            <input [(ngModel)]="form.jobTitle" name="jobTitle" required class="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 dark:bg-gray-800 dark:text-gray-100 text-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400 transition-all" />
          </div>
          <div>
            <label class="block text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">Status</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-select [(ngModel)]="form.jobStatus" name="jobStatus" required class="text-lg text-center">
                <mat-select-trigger>
                  <ng-container [ngSwitch]="form.jobStatus">
                    <span *ngSwitchCase="'APPLIED'" class="flex items-center justify-center gap-2 w-full text-center">
                      <span class="material-icons text-blue-500">send</span>
                      <span>Applied</span>
                    </span>
                    <span *ngSwitchCase="'INTERVIEW'" class="flex items-center justify-center gap-2 w-full text-center">
                      <span class="material-icons text-purple-500">event_available</span>
                      <span>Interview</span>
                    </span>
                    <span *ngSwitchCase="'OFFER'" class="flex items-center justify-center gap-2 w-full text-center">
                      <span class="material-icons text-green-500">card_giftcard</span>
                      <span>Offer</span>
                    </span>
                    <span *ngSwitchCase="'REJECTED'" class="flex items-center justify-center gap-2 w-full text-center">
                      <span class="material-icons text-red-500">cancel</span>
                      <span>Rejected</span>
                    </span>
                    <span *ngSwitchCase="'ACCEPTED'" class="flex items-center justify-center gap-2 w-full text-center">
                      <span class="material-icons text-emerald-500">check_circle</span>
                      <span>Accepted</span>
                    </span>
                    <span *ngSwitchDefault class="text-gray-400 w-full text-center">Select status</span>
                  </ng-container>
                </mat-select-trigger>
                <mat-option value="APPLIED" class="text-lg">
                  <div class="flex items-center justify-center gap-2 w-full text-center">
                    <span class="material-icons text-blue-500">send</span>
                    Applied
                  </div>
                </mat-option>
                <mat-option value="INTERVIEW" class="text-lg">
                  <div class="flex items-center justify-center gap-2 w-full text-center">
                    <span class="material-icons text-purple-500">event_available</span>
                    Interview
                  </div>
                </mat-option>
                <mat-option value="OFFER" class="text-lg">
                  <div class="flex items-center justify-center gap-2 w-full text-center">
                    <span class="material-icons text-green-500">card_giftcard</span>
                    Offer
                  </div>
                </mat-option>
                <mat-option value="REJECTED" class="text-lg">
                  <div class="flex items-center justify-center gap-2 w-full text-center">
                    <span class="material-icons text-red-500">cancel</span>
                    Rejected
                  </div>
                </mat-option>
                <mat-option value="ACCEPTED" class="text-lg">
                  <div class="flex items-center justify-center gap-2 w-full text-center">
                    <span class="material-icons text-emerald-500">check_circle</span>
                    Accepted
                  </div>
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <div>
            <label class="block text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">Company Name</label>
            <mat-form-field appearance="outline" class="w-full">
              <input type="text" matInput [(ngModel)]="form.name" name="name" required [matAutocomplete]="auto" (ngModelChange)="onCompanyInput($event)" class="rounded-xl px-5 py-3 text-lg" />
              <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onCompanySelected($event.option.value)">
                <mat-option *ngFor="let company of filteredCompanies$ | async" [value]="company">
                  {{ company.name }}
                </mat-option>
              </mat-autocomplete>
            </mat-form-field>
          </div>
          <div>
            <label class="block text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">Description</label>
            <textarea [(ngModel)]="form.description" name="description" rows="3" class="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 dark:bg-gray-800 dark:text-gray-100 text-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400 transition-all"></textarea>
          </div>
          <div class="flex justify-end gap-4 mt-8">
            <button type="button" (click)="close.emit()" class="px-6 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 shadow transition-all">Cancel</button>
            <button type="submit" [disabled]="!appForm.form.valid" class="px-8 py-2.5 rounded-xl bg-pink-600 text-white font-bold hover:bg-pink-500 shadow-lg hover:shadow-xl transition-all text-lg">{{ mode === 'create' ? 'Add' : 'Update' }}</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* THEME-AWARE INPUTS */
    ::ng-deep .mat-mdc-form-field {
      width: 100%;
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    ::ng-deep .mat-mdc-form-field-flex {
      background: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    ::ng-deep .mat-mdc-form-field-outline {
      border-radius: 0.75rem !important;
      border-width: 1.5px !important;
      border-color: #d1d5db !important;
    }
    ::ng-deep .dark .mat-mdc-form-field-outline {
      border-color: #374151 !important;
    }
    ::ng-deep .mat-mdc-input-element, ::ng-deep input.mat-input-element, ::ng-deep textarea.mat-input-element {
      background: transparent !important;
      color: #222 !important;
      border-radius: 0.75rem !important;
      padding: 0.75rem 1.25rem !important;
      font-size: 1.125rem !important;
      border: none !important;
      box-shadow: none !important;
      margin: 0 !important;
    }
    ::ng-deep .dark .mat-mdc-input-element, ::ng-deep .dark input.mat-input-element, ::ng-deep .dark textarea.mat-input-element {
      color: #f3f4f6 !important;
      background: transparent !important;
    }
    ::ng-deep .mat-mdc-form-field-label {
      color: #6b7280 !important;
    }
    ::ng-deep .dark .mat-mdc-form-field-label {
      color: #d1d5db !important;
    }
    /* STATUS DROPDOWN CENTERING & THEME */
    ::ng-deep .mat-mdc-select-value, ::ng-deep .mat-mdc-option .mat-mdc-option-text {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      height: 48px !important;
      width: 100%;
      text-align: center !important;
      color: #222 !important;
    }
    ::ng-deep .dark .mat-mdc-select-value, ::ng-deep .dark .mat-mdc-option .mat-mdc-option-text {
      color: #f3f4f6 !important;
    }
    ::ng-deep .mat-mdc-select-value {
      min-height: 48px !important;
      align-items: center !important;
      display: flex !important;
      justify-content: center !important;
      color: #222 !important;
    }
    ::ng-deep .dark .mat-mdc-select-value {
      color: #f3f4f6 !important;
    }
    ::ng-deep .mat-mdc-option {
      text-align: center !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 48px !important;
      height: 48px !important;
      color: #222 !important;
      background: #fff !important;
      border-radius: 0.75rem !important;
      margin: 0 !important;
      box-shadow: none !important;
    }
    ::ng-deep .dark .mat-mdc-option {
      color: #f3f4f6 !important;
      background: #1f2937 !important;
      border-radius: 0.75rem !important;
    }
    ::ng-deep .mat-mdc-select-panel {
      color: #222 !important;
      background: rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: blur(10px) !important;
      border-radius: 0.75rem !important;
      box-shadow: none !important;
    }
    ::ng-deep .dark .mat-mdc-select-panel {
      color: #f3f4f6 !important;
      background: rgba(17, 24, 39, 0.9) !important;
      border-radius: 0.75rem !important;
    }
    ::ng-deep .mat-mdc-select {
      background: transparent !important;
      border-radius: 0.75rem !important;
    }
    ::ng-deep .mat-mdc-select-arrow {
      color: #222 !important;
    }
    ::ng-deep .dark .mat-mdc-select-arrow {
      color: #f3f4f6 !important;
    }
    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none !important;
    }
    ::ng-deep .mat-mdc-option:hover:not([disabled]) {
      background: rgba(0, 0, 0, 0.04) !important;
    }
    ::ng-deep .dark .mat-mdc-option:hover:not([disabled]) {
      background: rgba(255, 255, 255, 0.04) !important;
    }
  `]
})
export class ApplicationModalComponent {
  @Input() visible = false;
  @Input() application: any = null;
  @Input() mode: 'create' | 'update' = 'create';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  form: any = { jobTitle: '', jobStatus: '', name: '', description: '' };
  filteredCompanies$: Observable<Company[]> = of([]);

  constructor(private companyService: CompanyService) {}

  ngOnChanges() {
    if (this.application) {
      this.form = {
        jobTitle: this.application.jobTitle,
        jobStatus: this.application.jobStatus,
        name: this.application.name || this.application.companyName || '',
        description: this.application.description || this.application.companyDescription || ''
      };
    } else {
      this.form = { jobTitle: '', jobStatus: '', name: '', description: '' };
    }
    this.filteredCompanies$ = of([]);
  }

  onCompanyInput(value: string) {
    if (value && value.length > 1) {
      this.filteredCompanies$ = this.companyService.searchCompanies(value);
    } else {
      this.filteredCompanies$ = of([]);
    }
  }

  onCompanySelected(company: Company) {
    this.form.name = company.name;
    this.form.description = company.description || '';
  }

  onSave() {
    if (this.mode === 'create' && !this.form.description) {
      this.form.description = 'No description provided';
    }
    this.save.emit(this.form);
  }
} 