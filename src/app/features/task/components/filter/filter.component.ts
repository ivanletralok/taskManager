import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() filters: { label: string; value: string | boolean }[] = [];
  @Output() filterByStatus = new EventEmitter<string | boolean>();

  selectedFilter: string | boolean = 'all';

  /**
   *  Filters the tasks based on the status
   * @param status
   */
  applyFilter(status: string | boolean): void {
    this.selectedFilter = status;
    this.filterByStatus.emit(status);
  }
}
