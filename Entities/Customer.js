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

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get fullname() {
        return this.#fullname
    }
    set fullname(value) {
        this.#fullname = value
    }

    get address() {
        return this.#address
    }
    set address(value) {
        this.#address = value
    }

    get phone() {
        return this.#phone
    }
    set phone(value) {
        this.#phone = value
    }

    get email() {
        return this.#email
    }
    set email(value) {
        this.#email = value
    }

    get debt() {
        return this.#debt
    }
    set debt(value) {
        this.#debt = value
    }

    checkClass(){
        if (!this.#fullname || !this.#debt || !this.#phone){
            return "Chưa có thông tin về khách hàng"
        }
        else{
            return true
        }
    }

    sendJSON(moneyCollect){
        return {
            id : this.#id,
            fullname : this.#fullname,
            phone : this.#phone,
            address : this.#address,
            email : this.#email,
            debt : this.#debt + moneyCollect
        }
    }
    
}
export default Customer