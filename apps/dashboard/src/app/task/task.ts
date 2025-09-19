import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(title: string, description: string) {
    return this.http.post<Task>(this.apiUrl, { title, description });
  }

  updateTask(id: number, updates: Partial<Task>) {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, updates);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}