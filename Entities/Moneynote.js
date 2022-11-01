import Customer from './Customer.js';
class Moneynote {
    #id;
    #customer;
    #isDeleted;
    #moneyCollect;
    #isCreated;

    constructor(Id, Person, IsDeleted, MoneyCollect, IsCreated) {
        this.#id = Id;
        this.#customer = new Customer(Person.id, Person.fullname, Person.address, Person.phone, Person.email, Person.debt)
        this.#isDeleted = IsDeleted;
        this.#moneyCollect = MoneyCollect;
        this.#isCreated = IsCreated
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

    get isDeleted() {
        return this.#isDeleted
    }
    set isDeleted(value) {
        this.#isDeleted = value
    }

    get moneyCollect() {
        return this.#moneyCollect
    }
    set moneyCollect(value) {
        this.#moneyCollect = value
    }

    get isCreated() {
        return this.#isCreated
    }

    checkClass(adjust) {
        if (!this.#moneyCollect) {
            return "Chưa nhập số tiền thu"
        } else if (this.#moneyCollect <= 0 || adjust <= 0) {
            return "Số tiền phải là một số lớn hơn 0"
        } else if (this.#moneyCollect > this.#customer.debt) {
            return "Số tiền thu lớn hơn số tiền đang nợ của khách hàng"
        } else if (adjust > this.#moneyCollect + this.#customer.debt) {
            return 'Số tiền được nhập chưa đúng theo quy định'
        } else if (adjust == this.#moneyCollect) {
            return 'Số tiền được nhập trùng với số tiền của phiếu thu'
        } else {
            return true
        }

    }

    sendJSON(adjust) {
        return {
            id: this.#id,
            moneyCollect: (adjust != 0) ? adjust : this.#moneyCollect,
            isDeleted: this.#isDeleted,
            customer: this.#customer.sendJSON((adjust != 0) ? this.#moneyCollect - adjust : this.#moneyCollect * -1)
        }
    }
}
export default Moneynote