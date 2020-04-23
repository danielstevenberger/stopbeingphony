import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
  top: number;
  left: number;

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.top = Math.round((event.clientY / window.innerHeight) * 100);
    this.left = Math.round((event.clientX / window.innerWidth) * 100);
  }

}
