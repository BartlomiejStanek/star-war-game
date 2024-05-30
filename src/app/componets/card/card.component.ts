import {Component, Input} from '@angular/core';
import {Person} from "@app/model/interface/person";
import {Starship} from "@app/model/interface/starship";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() person?: Person;
  @Input() starship?: Starship;
  @Input() isLoading = false;
}
