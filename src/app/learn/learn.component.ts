import { Component, HostListener } from "@angular/core";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-learn",
  templateUrl: "./learn.component.html",
  styleUrls: ["./learn.component.sass"],
})
export class LearnComponent {
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  top: number;
  left: number;
  learn = 0;

  constructor() {}

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.top = Math.round((event.clientY / window.innerHeight) * 100);
    this.left = Math.round((event.clientX / window.innerWidth) * 100);
  }

  nextFact(dir: string) {
    if (dir == "next") {
      if (this.learn == 2) {
        this.learn = 0;
      } else {
        this.learn++;
      }
    } else {
      if (this.learn == 0) {
        this.learn = 2;
      } else {
        this.learn--;
      }
    }
  }
}
