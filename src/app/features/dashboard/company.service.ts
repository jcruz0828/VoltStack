import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Company {
  id: number;
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/companies`;

  constructor(private http: HttpClient) {}

  searchCompanies(name: string): Observable<Company[]> {
    return this.http.get<{ data: Company[] }>(`${this.apiUrl}/autocomplete?prefix=${encodeURIComponent(name)}`)
      .pipe(
        map(response => response.data || [])
      );
  }
} 