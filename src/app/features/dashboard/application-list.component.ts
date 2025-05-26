import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from './application.service';
import { ApplicationCardComponent } from './application-card.component';
import { ApplicationModalComponent } from './application-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ApplicationCardComponent, ApplicationModalComponent],
  template: `
    <div *ngIf="showAddButton" class="flex justify-end mb-6">
      <button class="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition" (click)="openCreateModal()">
        + Add Application
      </button>
    </div>
    <!-- Analytics Section -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <div class="rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow-xl p-4 flex flex-col items-center justify-center border border-blue-100 dark:border-gray-800 backdrop-blur-md">
        <div class="text-2xl font-extrabold text-blue-900 dark:text-yellow-300">{{ applications.length }}</div>
        <div class="text-xs text-gray-600 dark:text-yellow-200">Total</div>
      </div>
      <div *ngFor="let stat of statusStats" class="rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow-xl p-4 flex flex-col items-center justify-center border border-blue-100 dark:border-gray-800 backdrop-blur-md">
        <div class="text-2xl font-extrabold mb-1" [ngClass]="stat.color">{{ stat.count }}</div>
        <div class="mb-1" [innerHTML]="stat.icon"></div>
        <div class="text-xs text-gray-600 dark:text-yellow-200">{{ stat.label }}</div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto w-full">
      <!-- Modern Filter Bar -->
      <div class="relative bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl border border-blue-100 dark:border-gray-800 backdrop-blur-md transition-colors duration-200 mb-8">
        <div class="p-6 border-b border-blue-100 dark:border-gray-800 flex items-center gap-3">
          <svg class="w-6 h-6 text-blue-500 dark:text-yellow-400 opacity-80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
          <h2 class="text-lg font-bold text-blue-900 dark:text-yellow-300 tracking-tight">Filter Applications</h2>
          <span class="text-sm text-gray-600 dark:text-yellow-200 ml-2">Refine your job applications by status, company, or job title</span>
        </div>
        <form (ngSubmit)="applyFilters()" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Status Filter -->
            <div class="relative">
              <select 
                [(ngModel)]="filters.status" 
                name="status" 
                class="w-full rounded-xl border border-blue-200 dark:border-gray-700 px-4 py-4 pr-10 dark:bg-gray-900/80 dark:text-yellow-200 bg-white/80 text-blue-900 font-semibold shadow focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400 transition-all appearance-none"
                (focus)="statusFocused = true" (blur)="statusFocused = false"
              >
                <option value="" selected hidden></option>
                <option value="">All Statuses</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="PENDING">Pending</option>
                <option value="FOLLOW_UP">Follow Up</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              <label
                class="absolute left-4 px-1 bg-white/80 dark:bg-gray-900/80 font-semibold pointer-events-none transition-all duration-200"
                [class.top-4]="!statusFocused && !filters.status"
                [class.text-base]="!statusFocused && !filters.status"
                [class.text-blue-900]="!statusFocused && !filters.status"
                [class.dark\:text-yellow-300]="!statusFocused && !filters.status"
                [class.-top-3]="statusFocused || filters.status"
                [class.text-xs]="statusFocused || filters.status"
                [class.text-blue-600]="statusFocused || filters.status"
                [class.dark\:text-yellow-200]="statusFocused || filters.status"
              >Status</label>
              <svg class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 dark:text-yellow-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </div>
            <!-- Company Filter -->
            <div class="relative">
              <input 
                [(ngModel)]="filters.company" 
                name="company" 
                placeholder=" "
                class="peer w-full rounded-xl border border-blue-200 dark:border-gray-700 px-4 py-4 dark:bg-gray-900/80 dark:text-yellow-200 bg-white/80 text-blue-900 font-semibold shadow focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400 transition-all placeholder-transparent"
                (focus)="companyFocused = true" (blur)="companyFocused = false"
              />
              <label
                class="absolute left-4 px-1 bg-white/80 dark:bg-gray-900/80 font-semibold pointer-events-none transition-all duration-200 top-4 text-base text-blue-900 dark:text-yellow-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-yellow-200 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-600 dark:peer-[:not(:placeholder-shown)]:text-yellow-200"
              >Company</label>
            </div>
            <!-- Job Title Filter -->
            <div class="relative">
              <input 
                [(ngModel)]="filters.title" 
                name="title" 
                placeholder=" "
                class="peer w-full rounded-xl border border-blue-200 dark:border-gray-700 px-4 py-4 dark:bg-gray-900/80 dark:text-yellow-200 bg-white/80 text-blue-900 font-semibold shadow focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400 transition-all placeholder-transparent"
                (focus)="titleFocused = true" (blur)="titleFocused = false"
              />
              <label
                class="absolute left-4 px-1 bg-white/80 dark:bg-gray-900/80 font-semibold pointer-events-none transition-all duration-200 top-4 text-base text-blue-900 dark:text-yellow-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-yellow-200 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-600 dark:peer-[:not(:placeholder-shown)]:text-yellow-200"
              >Job Title</label>
            </div>
          </div>
          <div class="flex justify-end gap-4 mt-8">
            <button 
              type="button" 
              (click)="clearFilters()" 
              class="px-6 py-2.5 rounded-xl bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-yellow-200 font-semibold hover:bg-blue-100 dark:hover:bg-gray-700 border border-blue-100 dark:border-gray-700 shadow transition-all"
            >
              Clear Filters
            </button>
            <button 
              type="submit" 
              class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-gray-900 font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="max-w-4xl mx-auto w-full">
      <!-- Application Cards -->
      <div class="flex flex-col items-center w-full">
        <div *ngIf="filteredApplications.length === 0" class="text-lg text-gray-500 dark:text-yellow-200 py-12">
          No applications found.
        </div>
        <app-application-card
          *ngFor="let app of pagedApplications"
          [application]="app"
          (update)="openUpdateModal(app)"
          (delete)="deleteApplication(app)"
          class="w-full"
        ></app-application-card>
        <div *ngIf="totalPages > 1" class="flex gap-2 mt-6">
          <button (click)="page = page - 1" [disabled]="page === 1" class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50">Prev</button>
          <ng-container *ngFor="let p of [].constructor(totalPages); let i = index">
            <button (click)="page = i + 1" [class.bg-blue-600]="page === i + 1" [class.text-white]="page === i + 1" class="px-3 py-1 rounded-lg font-semibold hover:bg-blue-100 dark:hover:bg-gray-800 transition" [disabled]="page === i + 1">{{ i + 1 }}</button>
          </ng-container>
          <button (click)="page = page + 1" [disabled]="page === totalPages" class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>

    <!-- Update Modal -->
    <app-application-modal
      [visible]="modalVisible"
      [application]="selectedApplication"
      mode="update"
      (close)="closeModal()"
      (save)="updateApplication($event)"
    ></app-application-modal>

    <!-- Create Modal -->
    <app-application-modal
      [visible]="modalVisible && !selectedApplication"
      [mode]="'create'"
      (close)="closeModal()"
      (save)="saveCreateApplication($event)"
    ></app-application-modal>
  `
})
export class ApplicationListComponent implements OnInit, OnDestroy {
  @Input() userId!: number;
  @Input() showAddButton = false;
  applications: any[] = [];
  filteredApplications: any[] = [];
  filters = { status: '', company: '', title: '' };
  modalVisible = false;
  selectedApplication: any = null;
  statusStats: any[] = [];
  private themeSubscription: Subscription;
  statusFocused = false;
  companyFocused = false;
  titleFocused = false;
  page = 1;
  pageSize = 5;
  get totalPages() {
    return Math.ceil(this.filteredApplications.length / this.pageSize) || 1;
  }
  get pagedApplications() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredApplications.slice(start, start + this.pageSize);
  }

  constructor(
    private appService: ApplicationService,
    public theme: ThemeService
  ) {
    this.themeSubscription = this.theme.isDarkMode$.subscribe(() => {
      // Force re-render of stats to update colors
      this.computeStats();
    });
  }

  ngOnInit() {
    this.fetchApplications();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  fetchApplications() {
    this.appService.getApplicationsByUser(this.userId).subscribe((res: any) => {
      this.applications = res.data || [];
      this.applyFilters();
      this.computeStats();
    });
  }

  applyFilters() {
    this.filteredApplications = this.applications.filter(app => {
      return (
        (!this.filters.status || app.jobStatus?.toLowerCase() === this.filters.status.toLowerCase()) &&
        (!this.filters.company || 
          (app.name?.toLowerCase().includes(this.filters.company.toLowerCase()) || 
           app.companyName?.toLowerCase().includes(this.filters.company.toLowerCase()))) &&
        (!this.filters.title || app.jobTitle?.toLowerCase().includes(this.filters.title.toLowerCase()))
      );
    });
    this.page = 1; // Reset to first page on filter
    this.computeStats();
  }

  clearFilters() {
    this.filters = { status: '', company: '', title: '' };
    this.applyFilters();
  }

  computeStats() {
    const statuses = [
      { key: 'APPLIED', label: 'Applied', color: 'text-blue-500', icon: `<svg viewBox='0 0 20 20' fill='#3B82F6' class='w-5 h-5'><circle cx='10' cy='10' r='8'/></svg>` },
      { key: 'INTERVIEW', label: 'Interview', color: 'text-purple-500', icon: `<svg viewBox='0 0 20 20' fill='#8B5CF6' class='w-5 h-5'><rect x='4' y='4' width='12' height='12' rx='3'/></svg>` },
      { key: 'OFFER', label: 'Offer', color: 'text-green-500', icon: `<svg viewBox='0 0 20 20' fill='#22C55E' class='w-5 h-5'><polygon points='10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8'/></svg>` },
      { key: 'ACCEPTED', label: 'Accepted', color: 'text-yellow-400', icon: `<svg viewBox='0 0 20 20' fill='#FACC15' class='w-5 h-5'><path d='M7 10l3 3 5-5' stroke='#FACC15' stroke-width='2' fill='none'/></svg>` },
      { key: 'REJECTED', label: 'Rejected', color: 'text-red-500', icon: `<svg viewBox='0 0 20 20' fill='#EF4444' class='w-5 h-5'><line x1='6' y1='6' x2='14' y2='14' stroke='#EF4444' stroke-width='2'/><line x1='14' y1='6' x2='6' y2='14' stroke='#EF4444' stroke-width='2'/></svg>` },
      { key: 'ON_HOLD', label: 'On Hold', color: 'text-gray-500', icon: `<svg viewBox='0 0 20 20' fill='#6B7280' class='w-5 h-5'><rect x='5' y='9' width='10' height='2' rx='1'/></svg>` },
      { key: 'PENDING', label: 'Pending', color: 'text-blue-300', icon: `<svg viewBox='0 0 20 20' fill='#60A5FA' class='w-5 h-5'><circle cx='10' cy='10' r='8'/><rect x='9' y='5' width='2' height='6' rx='1' fill='#fff'/><rect x='9' y='13' width='2' height='2' rx='1' fill='#fff'/></svg>` },
      { key: 'FOLLOW_UP', label: 'Follow Up', color: 'text-pink-500', icon: `<svg viewBox='0 0 20 20' fill='#EC4899' class='w-5 h-5'><path d='M10 2v16M2 10h16' stroke='#EC4899' stroke-width='2'/></svg>` },
      { key: 'ARCHIVED', label: 'Archived', color: 'text-gray-400', icon: `<svg viewBox='0 0 20 20' fill='#9CA3AF' class='w-5 h-5'><rect x='4' y='8' width='12' height='8' rx='2'/><rect x='6' y='4' width='8' height='4' rx='1'/></svg>` }
    ];
    this.statusStats = statuses.map(status => ({
      label: status.label,
      count: this.applications.filter(a => a.jobStatus === status.key).length,
      color: status.color,
      icon: status.icon
    }));
  }

  openUpdateModal(app: any) {
    this.selectedApplication = app;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.selectedApplication = null;
  }

  normalizeStatus(status: string): string {
    const statusMap: any = {
      'applied': 'APPLIED',
      'interview': 'INTERVIEW',
      'offer': 'OFFER',
      'accepted': 'ACCEPTED',
      'rejected': 'REJECTED',
      'on_hold': 'ON_HOLD',
      'pending': 'PENDING',
      'follow_up': 'FOLLOW_UP',
      'archived': 'ARCHIVED'
    };
    return statusMap[status?.toLowerCase().replace(/ /g, '_')] || status;
  }

  updateApplication(updated: any) {
    updated.jobStatus = this.normalizeStatus(updated.jobStatus);
    // If name is empty or unchanged, use the current companyName from the selected application
    if (!updated.name && this.selectedApplication?.companyName) {
      updated.name = this.selectedApplication.companyName;
    }
    this.appService.updateApplication(this.selectedApplication.id, updated).subscribe(() => {
      this.fetchApplications();
      this.closeModal();
    });
  }

  deleteApplication(app: any) {
    if (confirm('Are you sure you want to delete this application?')) {
      this.appService.deleteApplication(app.id).subscribe(() => {
        this.fetchApplications();
      });
    }
  }

  // Create
  openCreateModal() {
    this.selectedApplication = null;
    this.modalVisible = true;
  }

  saveCreateApplication(newApp: any) {
    newApp.userId = this.userId;
    newApp.jobStatus = this.normalizeStatus(newApp.jobStatus);
    this.appService.addApplication(newApp).subscribe(() => {
      this.fetchApplications();
      this.closeModal();
    });
  }
} 