import { Component, OnInit, Input } from '@angular/core';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';
import { LoggerService } from '../service/logger.service';
import { BattleService } from '../service/battle.service';
import { Subscription } from 'rxjs';
import { PokemonService } from '../service/pokemon.service';
import { ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() pokemon1: Pokemon;
  @Input() pokemon2: Pokemon;

  pokemonName1: string;
  pokemonName2: string;

  private subscriber: Subscription;
  onStart: boolean;
  onPause: boolean;

  constructor(
    public loggerService: LoggerService,
    public battleService: BattleService,
    private pokemonService: PokemonService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params : Params): void => {
      this.pokemonName1 = params.pokemon1;
      console.log(params.pokemon1.name);
      this.pokemonName2 = params.pokemon2;
      console.log(params.pokemon2.name);
      this.letsFight();
    });
  }

  letsFight() : void {
    this.pokemon1 = this.pokemonService.getPokemonByName(this.pokemonName1);
    this.pokemon2 = this.pokemonService.getPokemonByName(this.pokemonName2);
  }

  fight(): void {
    this.loggerService.addBeginLog('');
    this.subscriber = this.battleService.simulateFight(this.pokemon1, this.pokemon2).subscribe();
    this.onPause = true;
  }

  pause(): void {
    this.subscriber.unsubscribe();
    this.onStart = true;
  }

  play(): void {
    this.subscriber = this.battleService.simulateFight(this.pokemon1, this.pokemon2).subscribe();
    this.onStart = false;
  }

  reset(): void {
    this.loggerService.clear();
    this.pokemon1 = this.pokemonService.getPokemonByName(this.pokemonName1);
    this.pokemon2 = this.pokemonService.getPokemonByName(this.pokemonName2);

    this.onStart = false;
    this.onPause = false;
  }
}
