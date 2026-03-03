import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JsonPlaceholderService {
  // ahora apunta a nuestra propia API en el backend
  private base = '/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/users`).pipe(
      catchError((err) => {
        console.error('Error fetching users', err);
        return throwError(() => new Error('Error fetching users'));
      })
    );
  }

  createUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.base}/users`, payload).pipe(
      map((res) => res),
      catchError((err) => {
        console.error('Error creating user', err);
        return throwError(() => new Error('Error creating user'));
      })
    );
  }

  updateUser(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.base}/users/${id}`, payload).pipe(
      map((res) => res),
      catchError((err) => {
        console.error('Error updating user', err);
        return throwError(() => new Error('Error updating user'));
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/users/${id}`).pipe(
      map((res) => res),
      catchError((err) => {
        console.error('Error deleting user', err);
        return throwError(() => new Error('Error deleting user'));
      })
    );
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/users/${id}`).pipe(
      catchError((err) => {
        console.error('Error fetching user', err);
        return throwError(() => new Error('Error fetching user'));
      })
    );
  }
}
