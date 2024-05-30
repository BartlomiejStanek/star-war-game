import {Gender} from "@app/model/enum/gender";

export interface Person {
  birthYear: string;
  gender: Gender;
  height: string;
  mass: number,
  name: string;
}
