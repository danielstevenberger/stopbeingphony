import { Injectable, EventEmitter } from "@angular/core";
import { JournalEntry } from "./journal-entry.model";
import { DateServiceService } from "../date-service/date-service.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class JournalEntriesService {
  private jouranlEntries: JournalEntry[];
  public weeklyEntries = new Subject<{
    hours: number[];
    mood: number[];
    focus: number[];
    notes: string[];
  }>();

  constructor(private dateService: DateServiceService) {
    this.jouranlEntries = [
      new JournalEntry(new Date(2020, 3, 12), 0, 5, 1, "hello"),
      new JournalEntry(new Date(2020, 3, 13), 1, 5, 1),
      new JournalEntry(new Date(2020, 3, 14), 2, 5, 1, "hello"),
      new JournalEntry(new Date(2020, 3, 15), 3, 5, 1, "hello"),
      new JournalEntry(new Date(2020, 3, 16), 4, 5, 1),
      new JournalEntry(new Date(2020, 3, 17), 5, 5, 1, "hello"),
      new JournalEntry(new Date(2020, 3, 18), 6, 5, 1, "hello"),
      new JournalEntry(new Date(2020, 3, 19), 7, 5, 1, "hello"),
      new JournalEntry(new Date(2020, 3, 20), 8, 5, 1),
      new JournalEntry(new Date(2020, 3, 21), 9, 5, 1, "hello"),
      new JournalEntry(new Date(2020, 3, 22), 9, 5, 1),
      // new JournalEntry(new Date(2020, 3, 23), 9, 5, 1),
      // new JournalEntry(new Date(2020, 3, 24), 9, 5, 1),
      // new JournalEntry(new Date(2020, 3, 25), 9, 5, 1),
    ];
  }

  addJournalEntry(time: number, mood: number, focus: number, note: string) {
    var entry = new JournalEntry(new Date(), time, mood, focus, note);
    if (this.jouranlEntries) {
      this.jouranlEntries.push(entry);
    } else {
      this.jouranlEntries = [entry];
    }
  }

  getJounralEntries() {
    // return this.jouranlEntries.slice();
    return (this.jouranlEntries.length)
  }

  getRecentWeekHours(d: Date) {
    var currentDate = new Date(d);
    var sunday = new Date(currentDate.setHours(0, 0, 0, 0));
    var nextSunday = new Date(
      this.dateService.getNextSunday(currentDate).setHours(0, 0, 0, 0)
    );

    var hours = [];
    var mood = [];
    var focus = [];
    var notes = [];
    // var givenDate = d;
    // var day = givenDate.getDay();
    // var diff = givenDate.getDate() - day;
    // var nextSunday = new Date(givenDate.setDate(diff + 7));
    // nextSunday.setHours(0,0,0,0);
    // var sunday = new Date(givenDate.setDate(diff));
    // sunday.setHours(0, 0, 0, 0);

    // var givenDate2 = d;
    // var day2 = givenDate2.getDay();
    // var diff2 = givenDate2.getDate() - day2;

    for (let i = 0; i < 7; i++) {
      for (var x = 0; x < this.jouranlEntries.length; x++) {
        if (
          this.jouranlEntries[x].date >= sunday &&
          this.jouranlEntries[x].date.getDay() >= sunday.getDay() + i &&
          this.jouranlEntries[x].date < nextSunday
        ) {
          if (this.jouranlEntries[x].date.getDay() == i) {
            if (hours) {
              hours.push(this.jouranlEntries[x].time);
              mood.push(this.jouranlEntries[x].mood);
              focus.push(this.jouranlEntries[x].focus);
              notes.push(this.jouranlEntries[x].note);
              break;
            } else {
              hours = [this.jouranlEntries[x].time];
              mood = [this.jouranlEntries[x].mood];
              focus = [this.jouranlEntries[x].focus];
              notes = [this.jouranlEntries[x].note];
              break;
            }
          } else {
            if (hours) {
              hours.push(null);
              mood.push(null);
              focus.push(null);
              notes.push("");
              break;
            } else {
              hours = [null];
              mood = [null];
              focus = [null];
              notes = [""];
              break;
            }
          }
        }
      }
    }
    // if (notes.length < 7) {
    //   while(notes.length < 7){
    //    notes.push('null')
    //   }
    // }
    this.weeklyEntries.next({ hours, mood, focus, notes });
    return { hours, mood, focus, notes };
  }

  checkDay(d: Date) {
    for (let i = 0; i < this.jouranlEntries.length; i++) {
      if (this.jouranlEntries[i].date.getDate() == d.getDate()) {
        return false
      }
    }
    return true
  }
}
