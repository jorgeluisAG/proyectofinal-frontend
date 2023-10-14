import { Address } from './Address';
import {Person} from './Person';
export class User {
    constructor(
        public id: number,
        public nameUser: string,
        public mail: string,
        public password: string,
        public rol: string,
        public createdAt: string = 'null',
        public updatedAt: string = 'null',
        public person: Person,
        public address: Address,
    ) { }
}
