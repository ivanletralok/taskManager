import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ id: number }>()
);
export const completeTask = createAction(
  '[Task] Complete Task',
  props<{ id: number }>()
);
export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const filterTasks = createAction(
  '[Task] Filter Tasks',
  props<{ status: boolean | string }>()
);
