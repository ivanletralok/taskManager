import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { TaskFormComponent } from './task-form.component';
import { ErrorMessageComponent } from 'src/app/features/shared/error-message/error-message.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [
        StoreModule.forRoot(),
        ErrorMessageComponent,
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
