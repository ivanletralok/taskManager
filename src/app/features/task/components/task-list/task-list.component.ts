import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import {
  selectAllTasks,
  selectfilterTasks,
} from '../../store/selectors/task.selectors';
import {
  completeTask,
  removeTask,
  filterTasks,
} from '../../store/actions/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined;
  status: string | boolean = 'all';
  /**Status All */
  filters = [
    { label: 'Todas', value: 'all' },
    { label: 'Completadas', value: true },
    { label: 'Pendientes', value: false },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.onFilterChange('all');
    this.tasks$ = this.store.pipe(select(selectAllTasks));
  }

  /**
   *  Updates the status of a task
   * @param task
   * @returns void
   *
   */
  toggleCompletion(task: Task): void {
    this.store.dispatch(completeTask({ id: task.id }));
    this.store.dispatch(filterTasks({ status: this.status }));
  }

  /**
   * Remove a task from the list
   * @param id
   * @returns void
   */
  deleteTask(id: number): void {
    this.store.dispatch(removeTask({ id }));
    this.store.dispatch(filterTasks({ status: this.status }));
  }

  /**
   * Filters the tasks based on the status
   * @param status
   * @returns void
   */
  onFilterChange(status: string | boolean): void {
    this.status = status;
    this.store.dispatch(filterTasks({ status }));
    this.tasks$ = this.store.pipe(select(selectfilterTasks));
  }
}
