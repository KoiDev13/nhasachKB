import Book from './Book.js';
class Bookform {
    #id;
    #detail = [];
    #isDeleted;
    #isCreated;

    constructor(Id, Detail, IsDeleted, IsCreated) {
        this.#id = Id
        for (let i = 0; i < Detail.length; i++) {
            this.#detail.push(new Book(Detail[i].id, Detail[i].title, Detail[i].genre, Detail[i].author
                , Detail[i].quantity, Detail[i].price))
            this.#detail[i].numberBook = Detail[i].numberBook
        }
        this.#isDeleted = IsDeleted
        this.#isCreated = IsCreated
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get detail() {
        return this.#detail
    }

    get isDeleted() {
        return this.#isDeleted
    }
    set isDeleted(value) {
        this.#isDeleted = value
    }

    get isCreated() {
        return this.#isCreated
    }

    sendJSON() {
        let detail = []
        for (let i = 0; i < this.#detail.length; i++) {
            detail.push(this.#detail[i].sendJSON(this.#detail[i].numberBook))
        }
        return {
            id : this.#id,
            isDeleted: this.#isDeleted,
            detail: detail
        }
    }
}
export default Bookform