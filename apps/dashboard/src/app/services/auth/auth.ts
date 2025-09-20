import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { decodeToken } from '../../utils/jwt.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private http = inject(HttpClient); // ✅ instead of constructor
  private readonly tokenKey = 'token';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);

    const decoded = decodeToken(token);
    if (decoded) {
      localStorage.setItem('role', decoded.role);
    }
  }

  getRole(): 'Owner' | 'Admin' | 'Viewer' | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.role ?? null;
  }

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
