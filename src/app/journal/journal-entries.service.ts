import { Injectable, EventEmitter } from "@angular/core";
import { JournalEntry } from "./journal-entry.model";
import { DateServiceService } from "../date-service/date-service.service";
import { Subject } from "rxjs";
import {
  MonthlyData,
  WeeklyData,
  YearlyData,
} from "src/app/profile/profile-data/pofile-data.interface";

@Injectable({
  providedIn: "root",
})
export class JournalEntriesService {
  private jouranlEntries: JournalEntry[];
  public weeklyEntries = new Subject<WeeklyData>();
  public monthlyEntries = new Subject<MonthlyData>();
  public yearlyEntries = new Subject<YearlyData>();

  constructor(private dateService: DateServiceService) {
    this.jouranlEntries = [
      new JournalEntry(new Date(2020, 0, 1), 7.5, 1, 1),
      new JournalEntry(new Date(2020, 0, 2), 7.2, 1, 1),
      new JournalEntry(new Date(2020, 0, 3), 6.8, 2, 1),
      new JournalEntry(new Date(2020, 0, 4), 6.5, 2, 1),
      new JournalEntry(new Date(2020, 0, 5), 5.1, 3, 2),
      new JournalEntry(new Date(2020, 0, 6), 5.5, 3, 2),
      new JournalEntry(new Date(2020, 0, 7), 5.7, 3, 2),
      new JournalEntry(new Date(2020, 0, 8), 5.4, 3, 2),
      new JournalEntry(new Date(2020, 3, 12), 4, 3, 2, "hello"),
      new JournalEntry(new Date(2020, 3, 13), 4.5, 3, 2),
      new JournalEntry(new Date(2020, 3, 14), 4.7, 3, 2, "hello"),
      new JournalEntry(new Date(2020, 3, 15), 3.8, 4, 2, "hello"),
      new JournalEntry(new Date(2020, 3, 16), 3, 4, 2),
      new JournalEntry(new Date(2020, 3, 17), 3.2, 4, 2, "hello"),
      new JournalEntry(new Date(2020, 3, 18), 2.2, 3, 3, "hello"),
      new JournalEntry(new Date(2020, 3, 19), 2.2, 5, 2, "hello"),
      new JournalEntry(new Date(2020, 3, 20), 1, 4, 3),
      new JournalEntry(new Date(2020, 3, 21), 0.5, 5, 2, "hello"),
      new JournalEntry(new Date(2020, 3, 22), 2, 4, 3),
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
    return this.jouranlEntries.length;
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
              notes.push(null);
              break;
            } else {
              hours = [null];
              mood = [null];
              focus = [null];
              notes = [null];
              break;
            }
          }
        }
      }
    }
    this.weeklyEntries.next({ hours, mood, focus, notes });
    return { hours, mood, focus, notes };
  }

  checkDay(d: Date) {
    for (let i = 0; i < this.jouranlEntries.length; i++) {
      if (this.jouranlEntries[i].date.getDate() == d.getDate()) {
        return false;
      }
    }
    return true;
  }

  getDataByMonth(d: Date) {
    var year = new Date(d).getFullYear();
    var month = new Date(d).getMonth();
    var hours: number;
    var mood: number;
    var focus: number;
    var entries = 0;
    for (var i = 0; i < this.jouranlEntries.length; i++) {
      if (
        this.jouranlEntries[i].date.getMonth() == month &&
        this.jouranlEntries[i].date.getFullYear() == year
      ) {
        if (entries > 0) {
          hours += this.jouranlEntries[i].time;
          mood += this.jouranlEntries[i].mood;
          focus += this.jouranlEntries[i].focus;
        } else {
          hours = this.jouranlEntries[i].time;
          mood = this.jouranlEntries[i].mood;
          focus = this.jouranlEntries[i].focus;
        }
        entries++;
      }
    }
    var averageMood = mood / entries;
    var averageFocus = focus / entries;

    this.monthlyEntries.next({
      hours,
      averageMood,
      averageFocus,
    });
    return {
      hours,
      averageMood,
      averageFocus,
    };
  }

  getDataByYear(d: Date) {
    var year = new Date(d).getFullYear();
    var hours: number[];
    var averageMood: number[];
    var averageFocus: number[];
    for (var i = 0; i < 12; i++) {
      var tempHours = 0;
      var tempMood = 0;
      var tempFocus = 0;
      var entries = 0;
      for (var x = 0; x < this.jouranlEntries.length; x++) {
        if (
          this.jouranlEntries[x].date.getMonth() == i &&
          this.jouranlEntries[x].date.getFullYear() == year
        ) {
          if (entries > 0) {
            tempHours += this.jouranlEntries[x].time;
            tempMood += this.jouranlEntries[x].mood;
            tempFocus += this.jouranlEntries[x].focus;
          } else {
            tempHours = this.jouranlEntries[x].time;
            tempMood = this.jouranlEntries[x].mood;
            tempFocus = this.jouranlEntries[x].focus;
          }
          entries++;
        }
      }
      if (i == 0) {
        hours = [Math.round(tempHours)];
        averageMood = [Math.round(tempMood / entries)];
        averageFocus = [Math.round(tempFocus / entries)];
      } else {
        hours.push(Math.round(tempHours));
        averageMood.push(Math.round(tempMood / entries));
        averageFocus.push(Math.round(tempFocus / entries));
      }
    }
    this.yearlyEntries.next({
      hours,
      averageMood,
      averageFocus,
    });
    return {
      hours,
      averageMood,
      averageFocus,
    };
  }

  getHoursMood() {
    var hoursMood: Array<object>
    for (var i = 0; i < this.jouranlEntries.length; i++) {
      var dataSet = {x: this.jouranlEntries[i].time, y: this.jouranlEntries[i].mood}
      if(i == 0){
        hoursMood = [dataSet]
      }
      else{
        hoursMood.push(dataSet)
      }
    }
    return hoursMood
  }

  getHoursFocus() {
    var hoursfocus: Array<object>
    for (var i = 0; i < this.jouranlEntries.length; i++) {
      var dataSet = {x: this.jouranlEntries[i].time, y: this.jouranlEntries[i].focus}
      if(i == 0){
        hoursfocus = [dataSet]
      }
      else{
        hoursfocus.push(dataSet)
      }
    }
    return hoursfocus
  }
}
