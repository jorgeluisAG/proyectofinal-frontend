import {Person} from './Person';

export class User {
    constructor(
        public id: number,
        public userName: string,
        public email: string,
        public password: string,
        public activated: boolean,
        public rol: string,
        public createdAt: string = 'null',
        public updatedAt: string = 'null',
        public person: Person,
        public imageUser: string,
    ) { }
}
