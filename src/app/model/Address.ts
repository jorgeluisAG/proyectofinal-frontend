import { User } from "./User";

export class Address {
  constructor(
    public id: number,
    public description: string,
    public user: User,
    public status: boolean,
  ) { }
}

