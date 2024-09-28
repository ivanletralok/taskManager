import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import {
  addTask,
  completeTask,
  loadTasks,
  loadTasksSuccess,
  removeTask,
} from '../actions/task.actions';
import { Task } from '../../models/task.model';
import { TaskService } from './../../service/task.service';

@Injectable()
export class TaskEffects {
  constructor(
    @Inject(Actions) private actions$: Actions,
    private store: Store,
    private taskService: TaskService
  ) {}

  saveTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTask),
        tap((action) => {
          const newTask = action.task;
          this.taskService.saveTask(newTask);
        })
      ),
    { dispatch: false }
  );

  updateTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(completeTask),
        tap((action) => {
          this.taskService.updateTaskCompletion(action.id);
        })
      ),
    { dispatch: false }
  );

  removeTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeTask),
        tap((action) => {
          this.taskService.removeTask(action.id);
        })
      ),
    { dispatch: false }
  );

  loadTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadTasks),
        tap(() => {
          const tasks = this.taskService.getTask();
          return this.store.dispatch(loadTasksSuccess({ tasks }));
        })
      ),
    { dispatch: false }
  );
}
