import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Resource} from "@app/model/enum/resource";
import {PeopleService} from "@app/api/services/people.service";
import {StarshipService} from "@app/api/services/starship.service";
import {Player} from "@app/model/calss/player";
import {forkJoin} from "rxjs";
import { CardComponent } from '@app/componets/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [CardComponent, MatButtonModule, MatButtonToggleModule, ReactiveFormsModule, CommonModule],
  templateUrl: './arena.container.html',
  styleUrl: './arena.container.scss'
})
export class ArenaContainer {
  public readonly resourcesForm: FormControl<Resource | null> = new FormControl<Resource>(Resource.people);
  public readonly resources: Resource[] = [Resource.people, Resource.starships];
  public readonly player1: Player = new Player('Player 1');
  public readonly player2: Player = new Player('Player 2');
  public winner: string | null = null;
  public isLoading = false;

  public constructor(private readonly _peopleService: PeopleService,
                     private readonly _starshipService: StarshipService) {
  }

  public resourcesChange(): void{
    this.player1.resetResource();
    this.player2.resetResource();
    this.winner = null;
  }

  public drawPlayers(): void {
    this.winner = null;
    this.isLoading = true;
    this.resourcesForm.disable();
    if(this.resourcesForm.value === Resource.people){
      forkJoin([this._peopleService.getRandomPerson(),this._peopleService.getRandomPerson()]).subscribe(([person1, person2]) => {
        this.player1.setResource(person1);
        this.player2.setResource(person2);
        this.isLoading = false;
        this.resourcesForm.enable();
      });
    } else {
      forkJoin([this._starshipService.getRandomStarship(), this._starshipService.getRandomStarship()]).subscribe(([starship1, starship2]) => {
        this.player1.setResource(starship1);
        this.player2.setResource(starship2);
        this.isLoading = false;
        this.resourcesForm.enable();
      });
    }
  }

  public play(): void {
    this.winner = Player.getWinner(this.player1, this.player2);
  }
}
