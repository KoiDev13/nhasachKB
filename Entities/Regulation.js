import Rule from './Rule.js';
class Regulation {
    #id;
    #title;
    #description;
    #rules;

    constructor(Id, Title, Description, Rules) {
        this.#id = Id;
        this.#title = Title;
        this.#description = Description;
        this.#rules = new Rule(Rules.minReceive, Rules.minQuantityBeforeReceive, Rules.maxDebt, Rules.minQuantityAfterSell, Rules.allowConsiderDebt)
    }

    get title(){
        return this.#title
    }

    get rules(){
        return this.#rules
    }
}
export default Regulation