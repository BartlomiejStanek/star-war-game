import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Gender} from "@app/model/enum/gender";
import {Person} from "@app/model/interface/person";
import {PersonSchema} from "@app/api/schema/person.shema";

@Injectable()
export class PeopleService {

  constructor(private readonly _httpClient: HttpClient) { }

  public getRandomPerson(): Observable<Person> {
    // The swapi.dev API around 82 starships so we will get a random starship from 1 to 82 sometimes the API will return 404;
    const randomId = Math.floor(Math.random() * 82) + 1;
    return this._httpClient.get<PersonSchema>(`https://swapi.dev/api/people/${randomId}`).pipe(
      map(people => {
        return {
          ...people,
          mass: Number.isNaN(+people.mass) ? 0 : +people.mass,
          birthYear: people.birth_year,
          gender: people.gender as Gender
        }
      }
    ), catchError(error => {
      if(error.status === 404){
        // If the person with the random id does not exist we will try again
        return this.getRandomPerson();
      }
      throw error;
    }));
  }
}
