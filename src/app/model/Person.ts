export class Person {
    constructor(
        public id: number,
        public birthdate: string = 'null',
        public documentNumber: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public sex: string,
        public status: boolean,
    ) { }
}
