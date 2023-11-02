import { Person } from "../Person";

export class UserCreateDTO {
  constructor(
      public userName: string,
      public email: string,
      public status: boolean,
      public password: string,
      public person: Person,
  ) { }
}
