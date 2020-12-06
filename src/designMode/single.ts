export class Person {
    private static instance: Person
    private constructor (public name: string) {}

    static getInstance (name: string) {
        if (!this.instance) {
            this.instance = new Person(name)
        }

        return this.instance
    }
}

