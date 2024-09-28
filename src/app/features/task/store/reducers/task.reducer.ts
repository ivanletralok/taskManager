import { createReducer, on } from '@ngrx/store';
import {
  addTask,
  completeTask,
  filterTasks,
  loadTasksSuccess,
  removeTask,
} from '../actions/task.actions';
import { Task } from '../../models/task.model';

export interface TaskState {
  tasks: Task[];
  taskFilter?: Task[];
}

export const initialState: TaskState = {
  tasks: [],
  taskFilter: [],
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
  })),

  on(removeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  })),

  on(completeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }),
  })),

  on(filterTasks, (state, { status }) => {
    const taskCopy = state.tasks;
    const taskFilter = taskCopy.filter((task) => {
      if (status === 'all') return taskCopy;
      if (status) return task.completed;
      return !task.completed;
    });
    return {
      ...state,
      taskFilter,
    };
  })
);
