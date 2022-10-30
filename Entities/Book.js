class Book {
    #id;
    #title;
    #genre;
    #author;
    #quantity;
    #price;

    constructor(Id,Title,Genre,Author,Quantity,Price){
        this.#id = Id;
        this.#title = Title;
        this.#genre = Genre;
        this.#author = Author;
        this.#quantity = Quantity;
        this.#price = Price;
    }

    get Id(){
        return this.#id
    }
    set Id(value){
        this.#id = value
    }

    get Title(){
        return this.#title
    }
    set Title(value){
        this.#title = value
    }

    get Genre(){
        return this.#genre
    }
    set Genre(value){
        this.#genre = value
    }

    get Author(){
        return this.#author
    }
    set Author(value){
        this.#author = value
    }

    get Quantity(){
        return this.#quantity
    }
    set Quantity(value){
        this.#quantity = value
    }

    get Price(){
        return this.#price
    }
    set Price(value){
        this.#price = value
    }

}
export default Book