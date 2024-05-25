import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MainService } from '../../services/main.service';
import { PokemonRequest } from './home.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListComponent, FavoriteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public limit: number= 20;
  public offset: number= 0;
  public pokemonRequest!: PokemonRequest;

  constructor(public mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getPokemons(this.limit, this.offset).subscribe(pokemon => {
      this.pokemonRequest = pokemon;
    });
  }

  public menuActive: string = 'list';

}
