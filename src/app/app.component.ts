import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {PeopleService} from "@app/api/services/people.service";
import {StarshipService} from "@app/api/services/starship.service";
import {HttpClientModule} from "@angular/common/http";
import { ArenaContainer } from './containers/arena/arena.container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, ArenaContainer],
  providers: [StarshipService, PeopleService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
