import { Component, OnInit, Input } from '@angular/core';
import Pokemon from '../model/pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
