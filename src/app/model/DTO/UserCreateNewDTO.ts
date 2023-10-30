import { Authority } from "../Authority";
import { Person } from "../Person";
import { AddressDTO } from "./AddressDTO";

export class UserCreateNewDTO {
  constructor(

    public id: number,
    public userName: string,
    public email: string,
    public password: string,
    public status: boolean,
    public authority: Authority,
    public activated: boolean,
    public createdAt: string = 'null',
    public updatedAt: string = 'null',
    public person: Person,
    public imageUser: string,
    public addressRequests: AddressDTO[],
  ) { }


}
