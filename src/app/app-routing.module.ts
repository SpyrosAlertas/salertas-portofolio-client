import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { PortofolioComponent } from './portofolio/portofolio.component';
import { GamesComponent } from './games/games.component';
import { MatchMatchComponent } from './games/match-match/match-match.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'education', component: EducationComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'portofolio', component: PortofolioComponent },
  {
    path: 'games',
    component: GamesComponent,
    children: [
      { path: '', redirectTo: 'match-match', pathMatch: 'full' },
      { path: 'match-match', component: MatchMatchComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
