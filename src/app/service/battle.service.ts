import { Injectable } from '@angular/core';
import Pokemon from '../model/pokemon';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  interval: any;
  damages: number;

  constructor(private loggerService: LoggerService) { }

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
        // this.loggerService.addPokemon2Log(order[1].takeDamages(order[0].attacks[0], order[0]));
        this.damages = order[1].takeDamages(order[0].attacks[0], order[0]);
        this.loggerService.addDamageLog('', order[0].name, this.damages);
        if (order[1].currentHealth <= 0) {
          order[1].currentHealth = 0;
          resolve(order[0]);
          clearInterval(this.interval);
          console.log(`${order[1].name} est KO !`);
          this.loggerService.addDeadLog(`${order[1].name} est KO !`);
          order[1].image = 'assets/img/cross.png';
          console.log(`${order[0].name} gagne !`);
          this.loggerService.addNormalLog(`${order[0].name} gagne !`);
          return;
        }

        this.loggerService.addPokemon2Log(order[1].attackTarget(order[1].attacks[0], order[0]));
        // this.loggerService.addPokemon1Log(order[0].takeDamages(order[1].attacks[0], order[1]));
        this.damages = order[0].takeDamages(order[1].attacks[0], order[1]);
        this.loggerService.addDamageLog('', order[1].name, this.damages);
        if (order[0].currentHealth <= 0) {
          order[0].currentHealth = 0;
          resolve(order[1]);
          clearInterval(this.interval);
          console.log(`${order[0].name} est KO !`);
          this.loggerService.addDeadLog(`${order[0].name} est KO !`);
          order[0].image = 'assets/img/cross.png';
          console.log(`${order[1].name} gagne !`);
          this.loggerService.addNormalLog(`${order[1].name} gagne !`);
          return;
        }
      }, 1000, pokemon1, pokemon2);
    });
  }

  clearInterval(): void {
    clearInterval(this.interval);
  }
}
