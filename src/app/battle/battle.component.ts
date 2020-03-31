import { Component, OnInit, Input } from '@angular/core';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { MessageComponent } from '../message/message.component';
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() pokemon1: PokemonComponent;
  @Input() pokemon2: PokemonComponent;
  // @Input() charge: AttackComponent;
  // @Input() trempette: AttackComponent;
  @Input() action = ' ';
  @Input() message: MessageComponent;
  interval: any;

  constructor() { }

  ngOnInit(): void {
    const charge: Attack = new Attack('Charge', 50, 100, 'Normal', 'Physic');
    const trempette: Attack = new Attack('trempette', 0, 100, 'Normal', 'Physic');
    const attacks: Array<Attack> = [charge, trempette];
    this.pokemon1 = new PokemonComponent();
    this.pokemon2 = new PokemonComponent();
    // this.charge = new AttackComponent();
    // this.trempette = new AttackComponent();
    this.pokemon1.pokemon = new Pokemon('Pikachu', 50, 142, 142, 117, 90, 156, attacks);
    this.pokemon1.image =  '.https://www.pokepedia.fr/images/archive/0/06/20081102125949%21Magicarpe-RFVF.png';
    this.pokemon2.pokemon = new Pokemon('Magicarpe', 50, 142, 142, 117, 90, 156, attacks);
    this.pokemon2.image = '../../assets/img/129.png';
  }

  fight(): void{
    this.simulateFight(this.pokemon1.pokemon, this.pokemon2.pokemon);
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
        this.action += 'Nouveau tour \n\r';
        const order = this.orderPokemonToAttack(pokemon1, pokemon2);
        console.log(`${order[0].name} commence`);
        this.message = new MessageComponent();
        this.message.content = 'zzzepartis';
        this.action += `${order[0].name} commence \n\r`;
        this.action += order[0].attackTarget(order[0].attacks[0], order[1]) + `\n\r`;
        this.action += order[1].takeDamages(order[0].attacks[0], order[0]) + `\n\r` ;

        if (order[1].health <= 0) {
          order[1].health = 0;
          resolve(order[0]);
          clearInterval(this.interval);
          console.log(order[0].name + ' gagne !');
          this.action += order[0].name + ' gagne ! \n\r';
          return;
        }
        this.action += order[1].attackTarget(order[1].attacks[0], order[0]) + `\n\r`;
        this.action += order[0].takeDamages(order[1].attacks[0], order[1]) + `\n\r`;

        if (order[0].health <= 0) {
          order[0].health = 0;
          resolve(order[1]);
          clearInterval(this.interval);
          console.log(order[1].name + ' gagne !');
          this.action += order[1].name + ' gagne ! \n\r';
          return;
        }
      }, 1000, pokemon1, pokemon2);
    });
  }


}
