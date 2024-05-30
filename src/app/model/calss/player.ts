import {Starship} from "@app/model/interface/starship";
import {Person} from "@app/model/interface/person";

export class Player{
  public static isStarship(resource: Starship): resource is Starship {
    return 'crew' in resource;
  }
  public static getWinner(player1: Player, player2: Player): string {
    if(player1.person && player2.person){
      if(player1.person.mass === player2.person.mass)
        return 'Tie!';
      if(player1.person.mass > player2.person.mass){
        player1.addPoint();
        return `Winner is ${player1.name}`;
      }else {
        player2.addPoint();
        return `Winner is ${player2.name}`;
      }
    }
    if(player1.starship && player2.starship){
      if(player1.starship.crew === player2.starship.crew)
        return 'Tie!';
      if(player1.starship.crew > player2.starship.crew){
        player1.addPoint();
        return `Winner is ${player1.name}`;
      }else {
        player2.addPoint();
        return `Winner is ${player2.name}`;
      }
    }
    return "No winner!";
  }

  private _score: number = 0;
  private _starship: Starship | undefined = undefined;
  private _person: Person | undefined = undefined;

  constructor(public name: string) {
  }

  get score(): number {
    return this._score;
  }

  get starship(): Starship | undefined {
    return this._starship;
  }

  get person(): Person | undefined {
    return this._person;
  }

  public addPoint(): void {
    this._score++;
  }

  public setResource(resource: Starship | Person): void {
    if (Player.isStarship(resource as Starship)) {
      this._starship = resource as Starship;
    } else {
      this._person = resource as Person;
    }
  }

  public resetResource(): void {
    this._starship = undefined;
    this._person = undefined;
  }
}
