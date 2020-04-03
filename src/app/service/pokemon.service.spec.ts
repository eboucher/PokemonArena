import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { PokemonApi } from '../model/pokemonApi';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return pikachu', async(() => {
  //   const http = TestBed.get(HttpTestingController);

  //   const mockedPokemon = { name: 'Pikachu'};
  //   service.getPokemonByName('pikachu').subscribe((pokemon: PokemonApi) => {
  //     expect(pokemon.id).toBe(25);
  //   });

  //   http.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu').flush(mockedPokemon);
  // }));

  // it('should return magicarpe', async(() => {
  //   const http = TestBed.get(HttpClientTestingModule);
  //   const mockedPokemon = { name: 'Magikarp'};
  //   service.getPokemonByName('magikarp').subscribe((pokemon: PokemonApi) =>  {
  //     expect(pokemon.id).toBe(129);
  //   });

  //   http.expectOne('https://pokeapi.co/api/v2/pokemon/magikarp').flush(mockedPokemon);
  // }));
});
