export class Session {
    constructor(private userId: number) {}

    thanks: boolean = false

    getThanks(id: number) {
        if (id === this.userId) {
            return this.thanks
        }
    }

    setThanks(thanks: boolean, id: number) {
        if (id === this.userId) {
            this.thanks = thanks
        }
    }
}