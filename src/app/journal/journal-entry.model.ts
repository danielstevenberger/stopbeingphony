export class JournalEntry {
  public date: Date
  public time: number;
  public mood: number;
  public focus: number;
  public note?: string


  constructor(
    date: Date,
    time: number,
    mood: number,
    focus: number,
    note?: string
  ) {
    this.date = date
    this.time = time
    this.mood = mood,
    this.focus = focus
    this.note = note
  }
}
