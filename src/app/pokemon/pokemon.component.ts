import { Component, OnInit, Input } from '@angular/core';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() image : string = "";

  constructor() { }

  ngOnInit(): void {
    let pikachuAttacks = Array<Attack>();
    const charge: Attack = new Attack("Charge", 50, 100, "Normal", "Physic");
    pikachuAttacks.push(charge);    
    this.pokemon = new Pokemon("Pikachu", 50, 142, 117, 90, 156, pikachuAttacks);
  }

}
