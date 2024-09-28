import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storeKey: string = 'tasks';

  constructor() {}

  getTask(): Task[] {
    const task = localStorage.getItem(this.storeKey);
    return task ? JSON.parse(task) : [];
  }

  saveTask(task: Task): void {
    const tasks = this.getTask();
    const updateTask = [...tasks, task];
    localStorage.setItem(this.storeKey, JSON.stringify(updateTask));
  }

  updateTaskCompletion(taskId: number): void {
    const tasks = this.getTask();
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    localStorage.setItem(this.storeKey, JSON.stringify(updatedTasks));
  }

  removeTask(id: number): void {
    const tasks = this.getTask();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem(this.storeKey, JSON.stringify(updatedTasks));
  }
}
