import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.sass']
})
export class LearnComponent{

  top: number;
  left: number;

  constructor() {}

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.top = Math.round((event.clientY / window.innerHeight) * 100);
    this.left = Math.round((event.clientX / window.innerWidth) * 100);
  }

}
