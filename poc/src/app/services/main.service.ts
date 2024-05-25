import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PokemonDetail, PokemonRequest } from '../../app/screens/home/home.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset:number): Observable<PokemonRequest> {
    const url= `${environment.baseUrl}?limit=${limit}&offset=${offset}`;
    //const url= 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    return this.http.get<PokemonRequest>(url)
  }

  getDetails(id: number): Observable<PokemonDetail> {
    const url= `${environment.baseUrl}/${id}`
    return this.http.get<PokemonDetail>(url)
  }
}
