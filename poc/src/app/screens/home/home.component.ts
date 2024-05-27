import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MainService } from '../../services/main.service';
import { PokemonRequest } from './home.models';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    FavoriteComponent,
    MatTabsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public limit: number= 20;
  public offset: number= 0;
  public pokemonRequest!: PokemonRequest;
 
  constructor(public mainService: MainService) {}

  ngOnInit(): void {
    this.getPokemons(this.limit, this.offset);
  }

  changeOffset(offset: number): void {
    this.getPokemons(this.limit, offset)
  }

  getPokemons(limit: number, offset:number): void {
    this.mainService.getPokemons(limit, offset).subscribe(pokemon => {
      this.pokemonRequest = pokemon;
    });
  }

}
