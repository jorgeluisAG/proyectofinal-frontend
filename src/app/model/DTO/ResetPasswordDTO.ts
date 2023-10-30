export class ResetPasswordDTO {
    constructor(
        public id: number,
        public password: string,
        public newPassword: string,
        public confirmPassword: string,
    ) { }
}
