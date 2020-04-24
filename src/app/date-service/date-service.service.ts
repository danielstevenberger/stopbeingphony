import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DateServiceService {
  constructor() {}
  getCurrentSunday(d: Date) {
    var givenDate = new Date(d);
    var day = givenDate.getDay();
    var diff = givenDate.getDate() - day;
    givenDate.setHours(0, 0, 0, 0);
    return new Date(givenDate.setDate(diff));
  }
  getPrevSunday(d: Date) {
    var givenDate = new Date(d);
    var day = givenDate.getDay();
    var diff = givenDate.getDate() - day;
    return new Date(givenDate.setDate(diff - 7));
  }
  getNextSunday(d: Date) {
    var givenDate = new Date(d);
    var day = givenDate.getDay();
    var diff = givenDate.getDate() - day;
    return new Date(givenDate.setDate(diff + 7));
  }
  getMonth(d: Date) {
    var givenDate = new Date(d);
    return new Date(givenDate.getMonth());
  }
  getNextMonth(d: Date) {
    var givenDate = new Date(d);
    var month = givenDate.getMonth();
    return new Date(givenDate.setMonth(month + 1));
  }
  getPrevMonth(d: Date) {
    var givenDate = new Date(d);
    var month = givenDate.getMonth();
    return new Date(givenDate.setMonth(month - 1));
  }
  getYear(d: Date) {
    var givenDate = new Date(d);
    return new Date(givenDate.getFullYear());
  }
  getNextYear(d: Date) {
    var givenDate = new Date(d);
    var year = givenDate.getFullYear();
    return new Date(givenDate.setFullYear(year  + 1));
  }
  getPrevYear(d: Date) {
    var givenDate = new Date(d);
    var year = givenDate.getFullYear();
    return new Date(givenDate.setFullYear(year - 1));
  }
}
