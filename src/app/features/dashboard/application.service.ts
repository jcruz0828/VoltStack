import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private apiUrl = `${environment.apiUrl}/applications`;

  constructor(private http: HttpClient) {}

  addApplication(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  updateApplication(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  deleteApplication(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getApplicationsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getApplicationsByStatus(userId: number, status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/status/${status}`);
  }

  getApplicationsByCompany(userId: number, companyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/company/${companyId}`);
  }

  getApplicationsByJobTitle(userId: number, title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/job-title?title=${title}`);
  }

  getApplicationsByCompanyName(userId: number, name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/company-name?name=${name}`);
  }
} 