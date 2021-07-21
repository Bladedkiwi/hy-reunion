import { Injectable } from "@angular/core";
import { MOCKSCHEDULES } from "./MOCKSCHEDULES";
import { ScheduleEvent } from "./schedule-event.model";
import { Subject } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  scheduleEventList: ScheduleEvent[] = [];
  selectedScheduleEvent$ = new Subject<ScheduleEvent>();
  updateScheduleListEvent$ = new Subject<any[]>();
  private scheduleEndpoint = 'http://localhost:3000/schedules';
  private jsonHeader = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private httpClient: HttpClient) {
    // this.scheduleEventList = MOCKSCHEDULES;
    httpClient.get<ScheduleEvent[]>(this.scheduleEndpoint).subscribe(
      (scheduleListDB) => {
        this.scheduleEventList = scheduleListDB;
        console.log(this.scheduleEventList);
        this.sortScheduleEventList();
      },
      error => {
        console.log(error.message);
      });
  }

  /**
   * GetScheduleEventList
   * Retrieves the schedule of events
   */
  getScheduleEventList(): ScheduleEvent[] {
    return this.scheduleEventList;
  }

  /**
   * GetScheduleEventById
   * Returns the Schedule Event that has the same requested id
   * @param id
   */
  getScheduleEventById(id: string): ScheduleEvent {
    return <ScheduleEvent>this.scheduleEventList.find(scheduleEvent => (scheduleEvent.id === id ? scheduleEvent : null));
  }

  /**
   * SortScheduleEventList
   * Sorts the Scheduled Event items to be in numerical order from their id
   * Then, updates the updateScheduleListEvent
   *
   */
  sortScheduleEventList(): void {
    this.scheduleEventList.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      else if ( a.id > b.id) {
        return 1;
      }
      else {
        return 0;
      }
    });
    this.updateScheduleListEvent$.next(this.scheduleEventList.slice());

  }

  private getScheduleEventMaxId() {
    let maxId = 0;

    const chkMax = (id: number) => {
      if (id > maxId) {
        maxId = id;
      }
    };

    this.scheduleEventList.forEach((item) => {
      chkMax(parseFloat(item.id));
    });

    return maxId;
  }

  /**
   * AddEventMealItem
   * Adds desired Meal Item, and updates and sends the Scheduled Event to the Database
   * @param selectedItem
   * @param currentScheduledEvent
   */
  addEventMealItem(selectedItem: string, currentScheduledEvent: ScheduleEvent | undefined) {
    if (currentScheduledEvent && currentScheduledEvent?.meal) {
      currentScheduledEvent.meal.mealItems.push(selectedItem);
      this.updateMealEventData(currentScheduledEvent, 'addItem');
    }
    else {return;}
  }

  /**
   * AddEventPlannedItem
   * Adds desired Planned Event Item, and updates and sends the Scheduled Event to the Database
   * @param selectedItem
   * @param currentScheduledEvent
   */
  addEventPlannedItem(selectedItem: string, currentScheduledEvent: ScheduleEvent | undefined) {
    if (currentScheduledEvent && currentScheduledEvent?.plannedEvent) {
      currentScheduledEvent.plannedEvent.details.push(selectedItem);
      this.updatePlannedEventData(currentScheduledEvent, 'addItem');
    }
    else {return;}
  }

  /**
   * DeleteEventMealItem
   * Deletes desired Meal Item, and updates and sends the Scheduled Event to the Database
   * @param selectedItem
   * @param currentScheduledEvent
   */
  deleteEventMealItem(selectedItem: string, currentScheduledEvent: ScheduleEvent | undefined) {
    if (currentScheduledEvent && currentScheduledEvent?.meal) {
      let pos = currentScheduledEvent.meal.mealItems.indexOf(selectedItem);
      currentScheduledEvent.meal.mealItems.splice(pos,1);
      this.updatePlannedEventData(currentScheduledEvent, 'deleteItem');
    }
    else {return;}
  }

  /**
   * DeleteEventPlannedItem
   * Deletes desired Planned Event Item, and updates and sends the Scheduled Event to the Database
   * @param selectedItem
   * @param currentScheduledEvent
   */
  deleteEventPlannedItem(selectedItem: string, currentScheduledEvent: ScheduleEvent | undefined) {
    if (currentScheduledEvent && currentScheduledEvent?.plannedEvent) {
      let pos = currentScheduledEvent.plannedEvent.details.indexOf(selectedItem);
      currentScheduledEvent.plannedEvent.details.splice(pos,1);
      this.updatePlannedEventData(currentScheduledEvent, 'deleteItem');
    }
    else {return;}
  }

  /**
   * UpdatePlannedEventData
   * Saves the updated values into the current event
   * @param editEvent
   * @param value
   */
  updatePlannedEventData(editEvent: ScheduleEvent, value: any) {
    let pos = 0;
    const originalEvent = this.getScheduleEventById(editEvent.id);

    pos = this.scheduleEventList.indexOf(originalEvent);
    console.log(pos);
    if (!(pos < 0)) {
      editEvent.id = originalEvent.id;

      if (value != ('addItem' || 'deleteItem')) {
        if (editEvent?.plannedEvent) {
          // Skips editing the event if adding or deleting an item from the event
          editEvent.plannedEvent.name = value.name == '' ? editEvent.plannedEvent.name : value.name;
          editEvent.plannedEvent.notes = value.notes == '' ? editEvent.plannedEvent.notes : value.notes;
          editEvent.plannedEvent.imageUrl = value.imageUrl == '' ? editEvent.plannedEvent.imageUrl : value.imageUrl;
          editEvent.plannedEvent.location = value.location == '' ? editEvent.plannedEvent.location : value.location;
          editEvent.plannedEvent.url = value.url == '' ? editEvent.plannedEvent.url : value.url;
          editEvent.plannedEvent.subject = value.subject == '' ? editEvent.plannedEvent.subject : value.subject;
        }
      }

      this.httpClient.put((this.scheduleEndpoint + '/' + editEvent.id), editEvent, {headers: this.jsonHeader }).subscribe(
        (res) => {
          console.log(editEvent);
          this.scheduleEventList[pos] = editEvent;
          this.sortScheduleEventList();
        });
    }
    else {return;}
  }

  /**
   * UpdateMealEventData
   * Saves the updated values into the current event
   * @param editEvent
   * @param value
   */
  updateMealEventData(editEvent: ScheduleEvent, value: any) {
    let pos = 0;
    const originalEvent = this.getScheduleEventById(editEvent.id);

    pos = this.scheduleEventList.indexOf(originalEvent);

    if (!(pos < 0)) {
      editEvent.id = originalEvent.id;

      if (value != ('addItem' || 'deleteItem')) {
        if (editEvent?.meal) {
          editEvent.meal.name = value.name == '' ? editEvent.meal.name : value.name;
          editEvent.meal.mealRecipe = value.mealRecipe == '' ? editEvent.meal.mealRecipe : value.mealRecipe;
          editEvent.meal.mealInstructions = value.mealInstructions == '' ? editEvent.meal.mealInstructions : value.mealInstructions;
          editEvent.meal.mealUrl = value.mealUrl == '' ? editEvent.meal.mealUrl : value.mealUrl;
        }
      }


      this.httpClient.put((this.scheduleEndpoint + '/' + editEvent.id), editEvent, {headers: this.jsonHeader }).subscribe(
        (res) => {
          console.log(editEvent);
          this.scheduleEventList[pos] = editEvent;
          this.sortScheduleEventList();
        });
    }
    else {return;}

  }

  /**
   * AddPlannedEvent
   * Creates a base model of an event to the day the user clicked on
   * @param plannedEvent
   */
  addPlannedEvent(plannedEvent: ScheduleEvent) {
    if (plannedEvent) {
      plannedEvent.id = String((this.getScheduleEventMaxId() + 1));

      this.httpClient.post<ScheduleEvent>(this.scheduleEndpoint, plannedEvent, {headers: this.jsonHeader}).subscribe(
        (scheduleEvent) => {
          console.log(scheduleEvent);
          this.scheduleEventList.push(scheduleEvent);
          this.sortScheduleEventList();
        });

    } else {return;}
  }

  /**
   * DeletePlannedEvent
   * Deletes the given scheduled event from the database
   * @param plannedEvent
   */
  deletePlannedEvent(plannedEvent: ScheduleEvent | undefined) {
    let pos = 0;
    if (plannedEvent) {
      pos = this.scheduleEventList.indexOf(plannedEvent);
      if (!(pos < 0)) {
        this.httpClient.delete((this.scheduleEndpoint + '/' + plannedEvent.id)).subscribe(
          (res) => {
            this.scheduleEventList.splice(pos, 1);
            this.sortScheduleEventList();
          });
      }
    } else {return;}
  }

}
