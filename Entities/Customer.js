class Customer {
    #id;
    #fullname;
    #address;
    #phone;
    #email;
    #debt;

    constructor(Id, Fullname, Address, Phone, Email, Debt) {
        this.#id = Id;
        this.#fullname = Fullname;
        this.#address = Address;
        this.#phone = Phone;
        this.#email = Email;
        this.#debt = Debt;
    }

    get Id() {
        return this.#id
    }
    set Id(value) {
        this.#id = value
    }

    get Fullname() {
        return this.#fullname
    }
    set Fullname(value) {
        this.#fullname = value
    }

    get Address() {
        return this.#address
    }
    set Address(value) {
        this.#address = value
    }

    get Phone() {
        return this.#phone
    }
    set Phone(value) {
        this.#phone = value
    }

    get Email() {
        return this.#email
    }
    set Email(value) {
        this.#email = value
    }

    get Debt() {
        return this.#debt
    }
    set Debt(value) {
        this.#debt = value
    }

    checkClass(){
        if (!this.#fullname|| !this.#address || !this.#email || !this.#debt || !this.#phone){
            return "Chưa nhập các thông tin của khách hàng"
        }
        else{
            return true
        }
    }
    
}
export default Customer