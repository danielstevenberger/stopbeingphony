import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { LearnComponent } from './learn/learn.component';
import { JournalComponent } from './journal/journal.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: "hello", component: HomeComponent},
  {path: "", redirectTo:"/hello", pathMatch: "full" },
  {path: "home", component: IntroComponent},
  {path: "learn", component: LearnComponent},
  {path: "journal", component: JournalComponent},
  {path: "profile", component: ProfileComponent},
  {path: "about", component: AboutComponent},
  {path: "**", redirectTo:"/hello"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
