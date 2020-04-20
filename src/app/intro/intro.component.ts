import { Component, HostListener } from "@angular/core";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.sass"],
})
export class IntroComponent {
  faDumbbell = faDumbbell;
  faBook = faBook;
  faSchool = faSchool;

  top: number;
  left: number;

  constructor() {}

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.top = Math.round((event.clientY / window.innerHeight) * 100);
    this.left = Math.round((event.clientX / window.innerWidth) * 100);
  }
}
