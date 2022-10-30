import Customer from './Customer.js';
class Moneynote {
    #id;
    #customer;
    #isDeleted;
    #moneyCollect;
    #isCreated;

    constructor(Id, Person, IsDeleted, MoneyCollect, IsCreated) {
        this.#id = Id;
        this.#customer = new Customer(Person.Id, Person.Fullname, Person.Address, Person.Phone, Person.Email, Person.Debt)
        this.#isDeleted = IsDeleted;
        this.#moneyCollect = MoneyCollect;
        this.#isCreated = IsCreated
    }

    get Id() {
        return this.#id
    }
    set Id(value) {
        this.#id = value
    }

    get Customer(){
        return this.#customer
    }

    get IsDeleted() {
        return this.#isDeleted
    }
    set IsDeleted(value) {
        this.#isDeleted = value
    }

    get MoneyCollect() {
        return this.#moneyCollect
    }
    set MoneyCollect(value) {
        this.#moneyCollect = value
    }

    get IsCreated() {
        return this.#isCreated
    }
    set IsCreated(value) {
        this.#isCreated = value
    }

    checkClass() {
        if (!this.#moneyCollect){
            return "Chưa nhập số tiền thu"
        }else if(typeof this.#customer.checkClass() === 'string'){
            return this.#customer.checkClass()
        }else if(this.#moneyCollect == 0){
            return "Chưa nhập số tiền thu"
        }else if (this.#moneyCollect > this.#customer.Debt) {
            return "Số tiền thu lớn hơn số tiền đang nợ của khách hàng"
        } else {
            return true
        }
    }

    sendJSON() {
        return {
            moneyCollect: this.#moneyCollect,
            isDeleted: this.#isDeleted,
            customerId: this.#customer.Id
        }
    }
}
export default Moneynote