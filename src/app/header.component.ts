import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'hfr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() selectedFeatureEvent = new EventEmitter<string>();
  // @Output() selectedUserMenuEvent = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  // /**
  //  * OnSelected
  //  * Responsible for emitting or firing the currently selected feature
  //  * @param selectedEvent user's event
  //  */
  // onSelected(selectedEvent: string): void {
  //   this.selectedFeatureEvent.emit(selectedEvent);
  // }
}
