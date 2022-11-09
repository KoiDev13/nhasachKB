import Customer from './Customer.js';
import Book from './Book.js';
class Receipt {
    #id;
    #customer;
    #detail = [];
    #isDeleted;
    #totalValue;
    #pay;
    #isCreated;

    constructor(Id, Person, Detail, IsDeleted, TotalValue, Pay, IsCreated) {
        this.#id = Id
        this.#customer = new Customer(Person.id, Person.fullname, Person.address, Person.phone, Person.email, Person.debt)
        for (let i = 0; i < Detail.length; i++) {
            this.#detail.push(new Book(Detail[i].id, Detail[i].title, Detail[i].genre, Detail[i].author
                , Detail[i].quantity, Detail[i].price))
            this.#detail[i].numberBook = Detail[i].numberBook
        }
        this.#isDeleted = IsDeleted
        this.#isCreated = IsCreated
        this.#totalValue = TotalValue
        this.#pay = Pay
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get customer() {
        return this.#customer
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

    get totalValue() {
        return this.#totalValue
    }
    set totalValue(value) {
        this.#totalValue = value
    }

    get pay() {
        return this.#pay
    }
    set pay(value) {
        this.#pay = value
    }

    checkClass(adjust) {
        if (this.#pay < 0 || adjust < 0) {
            return "Số tiền phải là một số lớn hơn 0"
        } else if (this.#pay > this.#totalValue) {
            return "Số tiền thanh toán đang lớn hơn tổng giá trị đơn hàng"
        } else if (adjust == this.#pay) {
            return "Số tiền được nhập trùng với số tiền thanh toán"
        } else if (adjust > this.#totalValue) {
            return "Số tiền được nhập chưa đúng theo quy định"
        } else {
            return true
        }
    }

    sendJSON(adjust) {
        let detail = []
        for (let i = 0; i < this.#detail.length; i++) {
            detail.push(this.#detail[i].sendJSON((this.#detail[i].numberBook) * -1))
        }
        return {
            id: this.#id,
            totalValue: this.#totalValue,
            pay: (adjust != undefined) ? this.#totalValue - adjust : this.#pay,
            isDeleted: this.#isDeleted,
            customer: this.#customer.sendJSON((adjust != undefined) ? ((this.#totalValue - this.#pay) - adjust) * -1 : this.#totalValue - this.#pay),
            detail: detail
        }
    }
}
export default Receipt