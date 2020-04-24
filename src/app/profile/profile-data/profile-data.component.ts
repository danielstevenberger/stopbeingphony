import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { JournalEntriesService } from "src/app/journal/journal-entries.service";
import { DateServiceService } from "src/app/date-service/date-service.service";
import { WeeklyData, MonthlyData, YearlyData } from "./pofile-data.interface";
import { Subject } from "rxjs";

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

  noJournals = this.journalEntrySerivce.getJounralEntries();
  view = "week";

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
  currentYear = new Date();
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

  prevYear() {
    this.currentYear = this.dateService.getPrevYear(this.currentYear);
    this.journalEntrySerivce.getDataByYear(this.currentYear);
  }
  nextYear() {
    this.currentYear = this.dateService.getNextYear(this.currentYear);
    this.journalEntrySerivce.getDataByYear(this.currentYear);
  }

  lineChartData: ChartDataSets[] = [
    { data: this.hoursOnPhone, label: "Hours on your phone" },
  ];
  moodData: ChartDataSets[] = [
    { data: this.mood, label: "Mood on scale of 1-5" },
  ];
  focusData: ChartDataSets[] = [
    { data: this.focus, label: "Focus on scale of 1-3" },
  ];

  lineChartLabels = [
    "Sunday",
    "Monaday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  hoursOptions = {
    responsive: true,
    maintainAspectRation: true,
    scales: {
      yAxes: [
        {
          ticks: {
            // max: 5,
            // min: 0,
            stepSize: 1,
          },
        },
      ],
    },
  };

  moodOptions = {
    responsive: true,
    maintainAspectRation: true,
    scales: {
      yAxes: [
        {
          ticks: {
            max: 5,
            min: 1,
            stepSize: 1,
          },
        },
      ],
    },
  };

  focusOptions = {
    responsive: true,
    maintainAspectRation: true,
    scales: {
      yAxes: [
        {
          ticks: {
            max: 3,
            min: 1,
            stepSize: 1,
          },
        },
      ],
    },
  };

  hoursColors = [
    {
      fill: false,
      backgroundColor: "blue",
      borderColor: "blue",
    },
  ];

  moodColors = [
    {
      fill: false,
      backgroundColor: "red",
      borderColor: "red",
    },
  ];

  focusColors = [
    {
      fill: false,
      backgroundColor: "green",
      borderColor: "green",
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";

  weekSubject: any;
  yearSubject: any;

  ngOnInit(): void {
    this.currentSunday = this.dateService.getCurrentSunday(new Date());
    this.journalEntrySerivce.getRecentWeekHours(new Date(this.currentSunday));
    this.journalEntrySerivce.weeklyEntries.subscribe((data: WeeklyData) => {
      this.hoursOnPhone = data.hours;
      this.mood = data.mood;
      this.focus = data.focus;
      this.notes = data.notes;
      this.lineChartData = [{ data: data.hours, label: "Hours on your phone" }];
      this.moodData = [{ data: data.mood, label: "Mood on scale of 1-5" }];
      this.focusData = [{ data: data.focus, label: "Focus on scale of 1-3" }];
    });
    this.journalEntrySerivce.yearlyEntries.subscribe((data: YearlyData) => {
      this.yearData = data;
      this.hourYearData = [
        { data: this.yearData.hours, label: "Hours on your phone" },
      ];
      this.moodYearData = [
        { data: this.yearData.averageMood, label: "Average Mood on scale 1-5" },
      ];
      this.focusYearData = [
        {
          data: this.yearData.averageFocus,
          label: "Average Focus on scale 1-3",
        },
      ];
    });
  }

  switchGraph(graph: string) {
    if (graph == "week") {
      this.view = "week";
    }
    if (graph == "year") {
      this.view = "year";
    }
    if (graph == "scatter") {
      this.view = "scatter";
    }
  }

  //BarChart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  public barChartType = "bar";
  public barChartLegend = true;
  yearData = this.journalEntrySerivce.getDataByYear(this.currentSunday);
  public hourYearData = [
    { data: this.yearData.hours, label: "Hours on your phone" },
  ];
  public moodYearData = [
    { data: this.yearData.averageMood, label: "Average Mood on scale 1-5" },
  ];
  public focusYearData = [
    { data: this.yearData.averageFocus, label: "Average Focus on scale 1-3" },
  ];

  //ScatterChart
  hourMoodData = [
    {
      data: this.journalEntrySerivce.getHoursMood(),
      label: "Hours vs Mood",
    },
  ];
  hourFocusData = [
    {
      data: this.journalEntrySerivce.getHoursFocus(),
      label: "Hours vs Focus",
    },
  ];
}
