import { Component, OnInit, Input } from '@angular/core';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { AttackComponent } from '../attack/attack.component';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() pokemon1: PokemonComponent;
  @Input() pokemon2: PokemonComponent;
  @Input() charge: AttackComponent;
  @Input() trempette: AttackComponent;
  
  constructor() { }

  ngOnInit(): void {
    const charge: Attack = new Attack("Charge", 50, 100, "Normal", "Physic");
    const trempette: Attack = new Attack("trempette", 0, 100, "Normal", "Physic");
    let attacks: Array<Attack> = [charge, trempette];
    this.pokemon1.pokemon = new Pokemon("Pikachu", 50, 142, 117, 90, 156, attacks);
    this.pokemon2.pokemon = new Pokemon("Magicarpe", 50, 142, 117, 90, 156, attacks);
  }
  
  fight() : void{
    
  }

}
