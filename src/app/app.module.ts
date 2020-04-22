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
import { JournalFormComponent } from './journal/journal-form/journal-form.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, IntroComponent, LearnComponent, ExerciseComponent, JournalComponent, JournalFormComponent, NavbarComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
