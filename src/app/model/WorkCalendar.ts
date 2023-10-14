import { User } from "./User";

export class WorkCalendar {
  constructor(
      public id: number,
      public createdAt: string = 'null',
      public updatedAt: string = 'null',
      public descriptionWork: string,
      public state: number,
      public user: User,
  ) { }
}
