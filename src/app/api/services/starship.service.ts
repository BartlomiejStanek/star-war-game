import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Starship} from "@app/model/interface/starship";
import {StarshipSchema} from "@app/api/schema/starship.schema";


@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  constructor(private readonly _httpClient: HttpClient) { }

  public getRandomStarship(): Observable<Starship> {
    // The swapi.dev API around 70 starships so we will get a random starship from 1 to 70 sometimes the API will return 404;
    const randomId = Math.floor(Math.random() * 70) + 1;
    return this._httpClient.get<StarshipSchema>(`https://swapi.dev/api/starships/${randomId}`).pipe(map(ship => {
      return {
        ...ship,
        crew: ship.crew === 'unknown' ? 0 : +ship.crew.replace(",", ""),
        cargoCapacity: ship.cargo_capacity
      }
    }), catchError(error => {
      if(error.status === 404){
        // If the starship with the random id does not exist we will try again
        return this.getRandomStarship();
      }
      throw error;
    }));
  }
}
