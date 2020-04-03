import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import Pokemon from '../model/pokemon';
import { PokemonApi, PokemonUrl, Result } from '../model/pokemonApi'
import Attack from '../model/attack';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private static API_URL: string = 'https://pokeapi.co/api/v2/';

  constructor(
    private http: HttpClient
  ) { }

  // Request to retrieve the first 151 pokemons
  getPokemonList(): Observable<PokemonUrl[]> {
    return this.http.get<Result>(`${PokemonService.API_URL}pokemon?limit=151`)
      .pipe(map(result => {
        return result.results;
      }));
  }

  getPokemonByUrl(pokemonUrl: PokemonUrl): Pokemon {
    let pokemon = new Pokemon(pokemonUrl.name);
    this.http.get<PokemonApi>(pokemonUrl.url)
      .pipe(map((rawPokemon: PokemonApi) => this.mapPokemon(rawPokemon, pokemon))).subscribe();

    return pokemon;
  }

  getPokemonByName(name: string): Pokemon {
    let pokemon = new Pokemon(`${name}`);
    const request = `${PokemonService.API_URL}pokemon/${name}/`; 
    this.http.get<PokemonApi>(request)
      .pipe(map((rawPokemon: PokemonApi) => this.mapPokemon(rawPokemon, pokemon))).subscribe();
      
    return pokemon;
  }

  private mapPokemon(rawPokemon: PokemonApi, pokemon: Pokemon) {
    pokemon.level = 50;
    pokemon.setSpeed(rawPokemon.stats.filter(stat => stat.stat.name === "speed")[0].base_stat);
    pokemon.setAttack(rawPokemon.stats.filter(stat => stat.stat.name === "attack")[0].base_stat);
    pokemon.setDefense(rawPokemon.stats.filter(stat => stat.stat.name === "defense")[0].base_stat);
    pokemon.setHealth(rawPokemon.stats.filter(stat => stat.stat.name === "hp")[0].base_stat);
    pokemon.imageBack = rawPokemon.sprites.back_shiny;
    pokemon.imageFront = rawPokemon.sprites.front_shiny;
    pokemon.attacks = [new Attack('Charge', 50, 100, 'Normal', 'Physic')];
  }
}
