export interface WeeklyData {
  hours: number[];
  mood: number[];
  focus: number[];
  notes: string[];
}

export interface MonthlyData {
  hours: number;
  averageMood: number;
  averageFocus: number;
}

export interface YearlyData {
  hours: number[];
  averageMood: number[];
  averageFocus: number[];
}
