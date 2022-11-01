class Book {
    #id;
    #title;
    #genre;
    #author;
    #quantity;
    #price;
    #change;

    constructor(Id,Title,Genre,Author,Quantity,Price){
        this.#id = Id;
        this.#title = Title;
        this.#genre = Genre;
        this.#author = Author;
        this.#quantity = Quantity;
        this.#price = Price;
    }

    get id(){
        return this.#id
    }
    set id(value){
        this.#id = value
    }

    get title(){
        return this.#title
    }
    set title(value){
        this.#title = value
    }

    get genre(){
        return this.#genre
    }
    set genre(value){
        this.#genre = value
    }

    get author(){
        return this.#author
    }
    set author(value){
        this.#author = value
    }

    get quantity(){
        return this.#quantity
    }
    set quantity(value){
        this.#quantity = value
    }

    get price(){
        return this.#price
    }
    set price(value){
        this.#price = value
    }

    get change(){
        return this.#change
    }
    set change(value){
        this.#change = value
    }

    sumPrice(value){
        return value + (this.#price * this.#change)
    }

    checkClass(){
        if (!this.#title || !this.#quantity || !this.#price){
            return "Chưa có thông tin về sách"
        }
        else{
            return true
        }
    }

    sendJSON(newQuantity){
        return {
            id : this.#id,
            title : this.#title,
            genre : this.#genre,
            author : this.#author,
            quantity : this.#quantity + newQuantity,
            price : this.#price,
            change : this.#change
        }
    }

}
export default Book