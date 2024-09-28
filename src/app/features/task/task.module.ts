import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskReducer } from './store/reducers/task.reducer';
import { TaskEffects } from './store/effects/task.effects';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskRoutingModule } from './task-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';

@NgModule({
  declarations: [
    TaskFormComponent,
    TaskListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    FilterComponent,
    ErrorMessageComponent,
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects]),

  ],
  exports: [
    TaskFormComponent,
    TaskListComponent,
  ]
})
export class TaskModule {}
