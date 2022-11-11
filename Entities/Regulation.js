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

    get title() {
        return this.#title
    }

    get rules() {
        return this.#rules
    }

    sendRules() {
        return [this.#rules.minReceive, this.#rules.minQuantityBeforeReceive,
        this.#rules.minQuantityAfterSell, this.#rules.maxDebt, this.#rules.allowConsiderDebt]
    }

    sendJSON() {
        return {
            id : this.#id,
            rules : this.#rules.sendJSON()
        }
    }
}
export default Regulation