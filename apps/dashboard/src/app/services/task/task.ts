import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

createTask(task: Task) {
  const payload = {
    title: task.title,
    description: task.description ?? '',
  };
  console.log('➡️ Sending payload to API:', payload);
  return this.http.post<Task>(`${this.apiUrl}/tasks`, payload);
}

updateTask(id: number, dto: { title?: string; description?: string }) {
  return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, dto);
}

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }
}
