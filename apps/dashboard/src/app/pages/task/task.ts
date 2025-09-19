import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../task/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  newTitle = '';
  newDescription = '';

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask() {
    if (!this.newTitle) return;
    this.taskService.createTask(this.newTitle, this.newDescription).subscribe((task) => {
      this.tasks.push(task);
      this.newTitle = '';
      this.newDescription = '';
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    });
  }
}
