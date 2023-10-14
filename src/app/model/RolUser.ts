import { User } from "./User";

export class RolUser {
  constructor(
      public id: number,
      public description: string,
      public state: number,
      public user: User,

  ) { }
}
