import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task/task';
import { Task } from '../../models/task';
import { decodeToken } from '../../utils/jwt.utils';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);

  tasks: Task[] = [];
  newTask: Task = { title: '', description: '' };

  // declare userRole
  userRole = 'Viewer'; // default

  // allow editingTask to be null
  editingTask: Task | null = null;


  ngOnInit() {
    this.loadTasks();
    this.setUserRoleFromToken();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask() {
    if (!this.newTask.title) return;
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '' };
      this.loadTasks();
    });
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
  }

  updateTask() {
    if (!this.editingTask || this.editingTask.id == null) return;

    this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe(() => {
      this.loadTasks();
      this.editingTask = null;
    });
  }

  cancelEdit() {
    this.editingTask = null;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private setUserRoleFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = decodeToken(token);
    if (decoded?.role) {
      this.userRole = decoded.role;
    }
  }
}
