import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { BattleComponent } from './battle/battle.component';
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import { ColorMessageDirective } from './directive/color-message.directive';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent }, // path: '/'
  { path: 'battle/:pokemon1/:pokemon2',  component: BattleComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    BattleComponent,
    MessageComponent,
    HomeComponent,
    ColorMessageDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
