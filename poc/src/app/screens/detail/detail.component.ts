import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main.service';
import { PokemonDetail } from '../home/home.models';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  public pokemonDetail!: PokemonDetail;

  constructor(private route: ActivatedRoute, public mainService: MainService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getDetails(params['id']);
    });
  }

  getDetails(id: number) {
    this.mainService.getDetails(id).subscribe(detail => {
      this.pokemonDetail = detail;
    });
  }
}
