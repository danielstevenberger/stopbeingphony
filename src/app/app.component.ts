import { Component } from "@angular/core";
import {fade} from "./animations"
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
  animations: [fade]
})
export class AppComponent {

}
