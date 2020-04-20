import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LearnComponent } from './learn/learn.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { JournalComponent } from './journal/journal.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, IntroComponent, LearnComponent, ExerciseComponent, JournalComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
