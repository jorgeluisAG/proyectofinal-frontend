import { User } from "./User";

export class WorkCalendar {
  constructor(
      public id: number,
      public startDate: string = 'null',
      public endDate: string = 'null',
      public descriptionWork: string,
      public status: number,
      public user: User,
      public createdAt: string = 'null',
      public updatedAt: string = 'null',

  ) { }
}
