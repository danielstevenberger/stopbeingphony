import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  faPlus,
  faMinus,
  faSmile,
  faGrinBeam,
  faMeh,
  faFrown,
  faMehBlank,
  faBatteryFull,
  faBatteryHalf,
  faBatteryQuarter,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-journal-form",
  templateUrl: "./journal-form.component.html",
  styleUrls: ["./journal-form.component.sass"],
})
export class JournalFormComponent implements OnInit {
  journalEntry: FormGroup;
  faPlus = faPlus;
  faMinus = faMinus;
  faGrinBeam = faGrinBeam;
  faSmile = faSmile;
  faMeh = faMeh;
  faFrown = faFrown;
  faMehBlank = faMehBlank;
  faBatteryFull = faBatteryFull;
  faBatteryHalf = faBatteryHalf;
  faBatteryQuarter = faBatteryQuarter;

  question = 0;
  hours = 0;
  minutes = 0;

  constructor() {}

  ngOnInit(): void {
    this.journalEntry = new FormGroup({
      hours: new FormControl(this.hours, [
        Validators.required,
        Validators.max(23),
        Validators.min(0),
      ]),
      minutes: new FormControl(this.minutes, [
        Validators.required,
        Validators.max(59),
        Validators.min(0),
      ]),
      mood: new FormControl(null, [Validators.required]),
      focus: new FormControl(null, [Validators.required]),
      note: new FormControl(null),
    });
  }
  submitForm() {
    if (this.journalEntry.valid) {
      console.log(this.journalEntry.value);
    }
  }

  onHours(direction: string) {
    if (direction == "plus" && this.hours < 23) {
      this.hours++;
    }
    if (direction == "minus" && this.hours > 0) {
      this.hours--;
    }
  }

  onMinutes(direction: string) {
    if (direction == "plus" && this.minutes < 59) {
      this.minutes += 1;
    }
    if (direction == "minus" && this.minutes > 0) {
      this.minutes -= 1;
    }
  }

  changeQuestion(direction: string) {
    if (direction == "next") {
      this.question++;
    } else {
      this.question--;
    }
  }
}
