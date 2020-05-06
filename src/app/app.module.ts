import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LearnComponent } from './learn/learn.component';
import { ProfileComponent } from './profile/profile.component';
import { JournalComponent } from './journal/journal.component';
import { JournalFormComponent } from './journal/journal-form/journal-form.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileDataComponent } from './profile/profile-data/profile-data.component';
import { AboutComponent } from './about/about.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, IntroComponent, LearnComponent,ProfileComponent, JournalComponent, JournalFormComponent, NavbarComponent, ProfileDataComponent, AboutComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FontAwesomeModule, ReactiveFormsModule, FormsModule, ChartsModule, NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
