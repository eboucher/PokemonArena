import { Component, OnInit, Input } from '@angular/core';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';
import { LoggerService } from '../service/logger.service';
import { BattleService } from '../service/battle.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() pokemon1: Pokemon;
  @Input() pokemon2: Pokemon;
  onStart: boolean;
  onPause: boolean;

  constructor(
    public loggerService: LoggerService,
    public battleService: BattleService
    ) { }

  ngOnInit(): void {
    this.reset();
  }

  fight(): void {
    this.battleService.simulateFight(this.pokemon1, this.pokemon2);
    this.onPause = true;
  }

  pause(): void {
    this.battleService.clearInterval();
    this.onStart = true;
  }

  play(): void {
    this.battleService.simulateFight(this.pokemon1, this.pokemon2);
    this.onStart = false;
  }

  reset(): void {
    this.loggerService.clear();
    const charge: Attack = new Attack('Charge', 50, 100, 'Normal', 'Physic');
    const trempette: Attack = new Attack('trempette', 0, 100, 'Normal', 'Physic');
    const attacks: Array<Attack> = [charge, trempette];

    this.pokemon1 = new Pokemon('Pikachu', 50, 142, 117, 90, 156, './assets/img/25.png', attacks);
    this.pokemon2 = new Pokemon('Magicarpe', 50, 142, 117, 90, 156, './assets/img/129.png', attacks);
    this.onStart = false;
    this.onPause = false;
  }
}
