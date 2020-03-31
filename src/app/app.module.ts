import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LikeButtonComponent } from './like-button/like-button.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { BattleComponent } from './battle/battle.component';
import { AttackComponent } from './attack/attack.component';

@NgModule({
  declarations: [
    AppComponent,
    LikeButtonComponent,
    PokemonComponent,
    BattleComponent,
    AttackComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
