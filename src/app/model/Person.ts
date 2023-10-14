export class Person {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public documentNumber: string,
        public birthdate: string = 'null',
        public status: number,
    ) { }
}
