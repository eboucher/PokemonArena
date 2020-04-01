import { Component, OnInit, Input } from '@angular/core';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';
import { LoggerService } from '../service/logger.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() pokemon1: Pokemon;
  @Input() pokemon2: Pokemon;
  interval: any;
  onStart: boolean;
  onPause: boolean;
  winner: string;

  constructor(public loggerService: LoggerService) { }

  ngOnInit(): void {
    const charge: Attack = new Attack('Charge', 50, 100, 'Normal', 'Physic');
    const trempette: Attack = new Attack('trempette', 0, 100, 'Normal', 'Physic');
    const attacks: Array<Attack> = [charge, trempette];

    this.pokemon1 = new Pokemon('Pikachu', 50, 142, 117, 90, 156, '../../assets/img/25.png', attacks);
    this.pokemon2 = new Pokemon('Magicarpe', 50, 142, 117, 90, 156, '../../assets/img/129.png', attacks);
    this.onStart = false;
    this.onPause = false;
  }

  fight(): void {
    this.simulateFight(this.pokemon1, this.pokemon2);
    this.onPause = true;

  }

  pause(): void {
    clearInterval(this.interval);
    this.onStart = true;
  }

  play(): void {
    this.simulateFight(this.pokemon1, this.pokemon2);
    this.onStart = false;
  }

  reset(): void {
    this.ngOnInit();
    this.loggerService.clear();
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  orderPokemonToAttack(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon[] {
    if (pokemon1.speed > pokemon2.speed) {
      return [pokemon1, pokemon2];
    }
    else if (pokemon1.speed < pokemon2.speed) {
      return [pokemon2, pokemon1];
    }
    // Si jamais ils ont la même vitesse : random entre les deux
    else {
      const random = this.getRandomInt(2);
      return random === 0 ? [pokemon1, pokemon2] : [pokemon2, pokemon1];
    }
  }

  simulateFight(pokemon1: Pokemon, pokemon2: Pokemon): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      this.interval = setInterval(() => {
        console.log('Nouveau tour');
        this.loggerService.addNormalLog('Nouveau tour');

        const order = this.orderPokemonToAttack(pokemon1, pokemon2);
        console.log(`${order[0].name} commence`);
        this.loggerService.addNormalLog(`${order[0].name} commence`);

        this.loggerService.addPokemon1Log(order[0].attackTarget(order[0].attacks[0], order[1]));
        this.loggerService.addPokemon2Log(order[1].takeDamages(order[0].attacks[0], order[0]));

        if (order[1].currentHealth <= 0) {
          order[1].currentHealth = 0;
          resolve(order[0]);
          clearInterval(this.interval);
          console.log(`${order[1].name} est KO !`);
          this.loggerService.addDeadLog(`${order[1].name} est KO !`);
          order[1].image = '../../assets/img/cross.png';
          console.log(`${order[0].name} gagne !`);
          this.loggerService.addNormalLog(`${order[0].name} gagne !`);
          this.winner = order[0].name;
          return;
        }

        this.loggerService.addPokemon2Log(order[1].attackTarget(order[1].attacks[0], order[0]));
        this.loggerService.addPokemon1Log(order[0].takeDamages(order[1].attacks[0], order[1]));

        if (order[0].currentHealth <= 0) {
          order[0].currentHealth = 0;
          resolve(order[1]);
          clearInterval(this.interval);
          console.log(`${order[0].name} est KO !`);
          this.loggerService.addDeadLog(`${order[0].name} est KO !`);
          order[0].image = '../../assets/img/cross.png';
          console.log(`${order[1].name} gagne !`);
          this.loggerService.addNormalLog(`${order[1].name} gagne !`);
          this.winner = order[1].name;
          return;
        }
      }, 1000, pokemon1, pokemon2);
    });
  }
}
