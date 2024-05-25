import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FavoriteComponent } from './favorite/favorite.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListComponent, FavoriteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public menuActive: string = 'list';
}
