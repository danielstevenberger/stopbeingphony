import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  constructor() { }
  getCurrentSunday(d: Date){
    var givenDate = d;
    var day = givenDate.getDay();
    var diff = givenDate.getDate() - day;
    givenDate.setHours(0,0,0,0)
    return new Date(givenDate.setDate(diff));
  }
  getPrevSunday(d: Date){
    var givenDate = d;
    var day = givenDate.getDay();
    var diff = givenDate.getDate() - day;
    return new Date(givenDate.setDate(diff - 7));
  }
  getNextSunday(d: Date){
    var givenDate = d;
    var day = givenDate.getDay();
    var diff = givenDate.getDate() - day;
    return new Date(givenDate.setDate(diff + 7));
  }
}
