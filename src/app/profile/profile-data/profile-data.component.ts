import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { JournalEntriesService } from "src/app/journal/journal-entries.service";
import { DateServiceService } from "src/app/date-service/date-service.service";
import { WeeklyData } from "./pofile-data.interface";

@Component({
  selector: "app-profile-data",
  templateUrl: "./profile-data.component.html",
  styleUrls: ["./profile-data.component.sass"],
})
export class ProfileDataComponent implements OnInit {
  constructor(
    private journalEntrySerivce: JournalEntriesService,
    private dateService: DateServiceService
  ) {}

  noJournals = this.journalEntrySerivce.getJounralEntries()

  weeks = [
    "Sunday",
    "Monaday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  currentSunday = this.dateService.getCurrentSunday(new Date());
  // hoursOnPhone = this.journalEntrySerivce.getRecentWeekHours(
  //   new Date(this.currentSunday)
  // );
  hoursOnPhone = this.journalEntrySerivce.getRecentWeekHours(this.currentSunday)
    .hours;
  mood = this.journalEntrySerivce.getRecentWeekHours(this.currentSunday).mood;
  focus = this.journalEntrySerivce.getRecentWeekHours(this.currentSunday).focus;
  notes = this.journalEntrySerivce.getRecentWeekHours(this.currentSunday).notes;

  prevSunday() {
    this.currentSunday = this.dateService.getPrevSunday(this.currentSunday);
    this.journalEntrySerivce.getRecentWeekHours(this.currentSunday);
  }

  nextSunday() {
    this.currentSunday = this.dateService.getNextSunday(this.currentSunday);
    this.journalEntrySerivce.getRecentWeekHours(this.currentSunday);
  }

  lineChartData: ChartDataSets[] = [
    { data: this.hoursOnPhone, label: "Hours on your phone" },
    { data: this.mood, label: "Mood on scale of 1-5" },
    { data: this.focus, label: "Focus on scale of 1-3" },
  ];
  // lineChartData: ChartDataSets

  lineChartLabels = [
    "Sunday",
    "Monaday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  lineChartOptions = {
    responsive: true,
    maintainAspectRation: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  lineChartColors = [
    {
      fill: false,
      backgroundColor: "blue",
      borderColor: "blue",
    },
    {
      fill: false,
      backgroundColor: "yellow",
      borderColor: "yellow",
    },
    {
      fill: false,
      backgroundColor: "red",
      borderColor: "red",
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";

  ngOnInit(): void {
    this.currentSunday = this.dateService.getCurrentSunday(new Date());
    this.journalEntrySerivce.getRecentWeekHours(new Date(this.currentSunday));
    this.journalEntrySerivce.weeklyEntries.subscribe((data: WeeklyData) => {
      this.hoursOnPhone = data.hours;
      this.mood = data.mood;
      this.focus = data.focus;
      this.notes = data.notes;
      this.lineChartData = [
        { data: data.hours, label: "Hours on your phone" },
        { data: data.mood, label: "Mood on scale of 1-5" },
        { data: data.focus, label: "Focus on scale of 1-3" },
      ];
    });
  }

}
