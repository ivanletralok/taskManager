import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTasks } from './features/task/store/actions/task.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'task-manager';
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }
}
