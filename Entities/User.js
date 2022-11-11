class User {
    #id;
    #username;
    #password;
    #role;
    #isDeleted;

    constructor(Id, Username, Password, Role, IsDeleted) {
        this.#id = Id;
        this.#username = Username;
        this.#password = Password;
        this.#role = Role;
        this.#isDeleted = IsDeleted
    }

    get id(){
        return this.#id
    }
    set id(value){
        this.#id = value
    }

    get username(){
        return this.#username
    }

    set username(value){
        this.#username = value
    }

    get password(){
        return this.#password
    }

    set password(value){
        this.#password = value
    }

    get role(){
        return this.#role
    }

    set role(value){
        this.#role = value
    }

    checkClass(){
        if (!this.#username || !this.#password || !this.#role){
            return "Chưa có thông tin về tài khoản"
        }
        else{
            return true
        }
    }

    sendJSON(){
        return {
            id : this.#id,
            username : this.#username,
            password : this.#password,
            isDeleted : this.#isDeleted,
            role : this.#role
        }
    }
}
export default User