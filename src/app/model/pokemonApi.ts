export interface Result {
    results: PokemonUrl[];
}

export interface PokemonUrl {
    name: string;
    url: string;
}

export interface PokemonApi {
    id: number;
    name: string;
    sprites: {
        front_shiny: string;
        back_shiny: string;
    };
    stats : Stat[];
}

interface Stat {
    base_stat: number;
    stat: {
        name: string,
  };
}