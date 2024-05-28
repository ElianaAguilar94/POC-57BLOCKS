import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, output } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PokemonRequest, PokemonList } from '../home.models';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnChanges, OnInit{

  public totalItems: number = 0;
  public pageSize: number = 20;
  public currentPage: number = 0;

  @Input() pokemonRequest!: PokemonRequest;
  offset = output<number>();
  public autocompletePokemon= new FormControl('');
  public autosuggestion: Array<PokemonList>=[];

  constructor() {}

  ngOnInit() {  
   this.autocompletePokemon.valueChanges.subscribe(search => {
    this.autosuggestion = this.filterPokemon(search || '');
   });
  }

  filterPokemon(search: string) {
    return this.pokemonRequest.results.filter(pokemon=>
      pokemon.name.toLowerCase().indexOf(search.toLowerCase()) === 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonRequest'].currentValue) {
      this.setPagination();
    }
  }

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

  setPagination(): void {
    this.autosuggestion = this.pokemonRequest.results;
    this.totalItems = this.pokemonRequest.count;
  }
 
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.offset.emit((event.pageIndex)*this.pageSize)
  }
}
