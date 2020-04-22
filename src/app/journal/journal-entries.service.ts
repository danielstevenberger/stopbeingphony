import { Injectable } from "@angular/core";
import { JournalEntry } from "./journal-entry.model";

@Injectable({
  providedIn: "root",
})
export class JournalEntriesService {
  private jouranlEntries: JournalEntry[];

  constructor() {}

  addJournalEntry(time: number, mood: number, focus: number, note: string) {
    var entry = new JournalEntry(new Date(), time, mood, focus, note);
    if (this.jouranlEntries) {
      this.jouranlEntries.push(entry);
    } else {
      this.jouranlEntries = [entry];
    }
  }

  getJounralEntries() {
    return this.jouranlEntries.slice();
  }
}
