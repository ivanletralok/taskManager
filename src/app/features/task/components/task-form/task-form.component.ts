import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTask } from '../../store/actions/task.actions';
import { Task } from '../../models/task.model';
import { selectAllTasks } from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined;

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.initForm();
    this.tasks$ = this.store.pipe(select(selectAllTasks));
  }

  ngOnInit(): void {}

  /**
   * Initializes the form group
   * @returns void
   */
  initForm(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      deadline: ['', Validators.required],
      people: this.fb.array([], this.atLeastOnePersonValidator),
    });
  }

  /**
   * Returns the people form array
   * @returns FormArray
   */
  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  /**
   * Adds a person to the form array
   * @returns void
   */
  addPerson(): void {
    const personForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          this.uniqueNameValidator.bind(this),
        ],
      ],
      age: ['', [Validators.required, Validators.min(19)]],
      skills: this.fb.array([], Validators.required),
    });
    this.people.push(personForm);
  }

  /**
   * Adds a skill to the person form array
   * @param personIndex
   * @returns void
   */
  addSkill(personIndex: number): void {
    const skills = this.getPersonSkills(personIndex);
    skills.push(this.fb.control('', Validators.required));
  }

  /**
   *  Removes a skill from the person form array
   * @param personIndex
   * @param skillIndex
   */
  removeSkill(personIndex: number, skillIndex: number): void {
    const skills = this.getPersonSkills(personIndex);
    skills.removeAt(skillIndex);
  }

  /**
   *  Returns the skills form array of a person
   * @param personIndex
   * @returns FormArray
   */
  getPersonSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  /**
   *  Removes a person from the form array
   * @param index
   */
  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  /**
   * checks if the name of a person is unique
   * @param control
   */
  uniqueNameValidator(control: FormControl): { [key: string]: boolean } | null {
    const name = control.value;
    const names = this.people.controls.map(
      (person) => person.get('name')?.value
    );
    return names.filter((n) => n === name).length > 1
      ? { uniqueName: true }
      : null;
  }

  /**
   *  Validates that at least one person is added
   * @param control
   */
  atLeastOnePersonValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const peopleArray = control as FormArray;
    return peopleArray.length === 0 ? { atLeastOnePerson: true } : null;
  }

  /**
   * Saves the task
   * @returns void
   */
  saveTask(): void {
    if (!this.taskForm.valid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task: Task = {
      ...this.taskForm.value,
      id: Math.random(),
      completed: false,
    };

    this.store.dispatch(addTask({ task }));
    this.saveSuccess();
  }

  /**
   * Shows a success message
   * @returns void
   */
  saveSuccess(): void {
    alert('Tarea Guardada !!');
    this.taskForm.reset();
    this.people.clear();
  }
}
