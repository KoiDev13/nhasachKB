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
            this.#detail.push(new Book(parseInt(Detail[i].id), Detail[i].children[1].children[0].value, Detail[i].children[2].innerHTML, null
                , parseInt(Detail[i].children[3].children[0].getAttribute('data-quantity')),
                parseInt(Detail[i].children[4].innerHTML)))
            this.#detail[i].change = parseInt(Detail[i].children[3].children[0].value)
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

    checkClass() {
        if (!this.#pay) {
            return "Chưa nhập số tiền thanh toán"
        } else if (this.#pay < 0) {
            return "Số tiền thanh toán phải lớn hơn 0"
        } else if (this.#pay > this.#totalValue) {
            return "Số tiền thanh toán đang lớn hơn tổng giá trị đơn hàng"
        } else {
            return true
        }
    }

    sendJSON() {
        let detail = []
        for (let i = 0; i < this.#detail.length; i++) {
            detail.push(this.#detail[i].sendJSON((this.#detail[i].change) * -1))
        }
        return {
            totalValue: this.#totalValue,
            pay: this.#pay,
            isDeleted: this.#isDeleted,
            customer: this.#customer.sendJSON(this.#totalValue - this.#pay),
            detail: detail
        }
    }
}
export default Receipt