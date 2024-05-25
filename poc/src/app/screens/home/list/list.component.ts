import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PokemonRequest } from '../home.models';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  @Input() pokemonRequest!: PokemonRequest;

  constructor() {}


  getPreviewPokemonList(): string {
    return window.localStorage.getItem('previewPokemonList') || '';
  }

  setPreviewPokemonList(pokemonList: string){
    return window.localStorage.setItem('previewPokemonList', pokemonList);
  }

  showDetail(urlDetail: string){
    const url:string = `${environment.originUrl}detail/${this.slipUrlPokemon(urlDetail)}`;
    window.open(url, '_blank');
  }

  slipUrlPokemon(urlDetail: string): string{
    let idDetails: string[] | string = urlDetail.split('pokemon/')[1]
    idDetails = idDetails.split('/');

    return idDetails[0];
  }

  setFavorite(url: string) {
    if (this.getPreviewPokemonList()) {
      const list = JSON.parse(this.getPreviewPokemonList())
      this.pushPreviewPokemonList(list,url)
    } else {
      this.pushPreviewPokemonList([],url);
    }
  }

  removeFavorite(url: string) {
    if (this.getPreviewPokemonList()) {
      const list = JSON.parse(this.getPreviewPokemonList())
      this.removePreviewPokemonList(list,url)
    }
  }

  removePreviewPokemonList(list: Array<number>, url: string) {
    var filterPokemon = list.filter(pokemon => pokemon != Number(this.slipUrlPokemon(url)))
    this.setPreviewPokemonList(JSON.stringify(filterPokemon));
  }

  pushPreviewPokemonList(list: Array<number>, url: string) {
    list.push(Number(this.slipUrlPokemon(url)));
    this.setPreviewPokemonList(JSON.stringify(list));
  }

  isFavorite(url: string): boolean {
    if (this.getPreviewPokemonList()) {
      const isFavorite = JSON.parse(this.getPreviewPokemonList()).find((value:any)=>value==this.slipUrlPokemon(url))
      return isFavorite ? true : false;
    } else {
      return false
    }
  }
}
