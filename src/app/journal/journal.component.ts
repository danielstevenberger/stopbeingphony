import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-journal",
  templateUrl: "./journal.component.html",
  styleUrls: ["./journal.component.sass"],
})
export class JournalComponent {
  top: number;
  left: number;

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.top = Math.round((event.clientY / window.innerHeight) * 100);
    this.left = Math.round((event.clientX / window.innerWidth) * 100);
  }
}
