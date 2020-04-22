import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  left: number
  top: number

  constructor(private router: Router){}

  @HostListener('mousemove',['$event'])
  onMouseMove(event: MouseEvent){
    this.top = Math.round(event.clientY / window.innerHeight * 100)
    this.left = Math.round(event.clientX / window.innerWidth * 100)
  }
}
