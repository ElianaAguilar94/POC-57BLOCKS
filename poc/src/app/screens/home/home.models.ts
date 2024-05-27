export interface PokemonRequest {
    count:number,
    next: string,
    previous: string,
    results: Array<PokemonList>
}

 export interface PokemonList {
    name: string,
    url: string
}

export interface PokemonDetail {
    name: string,
    base_experience: string,
    height: number,
    weight: number
}