import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  public listFavorite!: Array<string>;

  getPreviewPokemonList(): string {
    return window.localStorage.getItem('previewPokemonList') || '';
  }

  getFvaoriteList(): Array<number>{
    if (this.getPreviewPokemonList()) {
      return JSON.parse(this.getPreviewPokemonList());
    } else {
      return []
    }
  }
}
