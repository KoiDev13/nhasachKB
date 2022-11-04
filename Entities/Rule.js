class Rule {
    #minReceive;
    #minQuantityBeforeReceive;
    #maxDebt;
    #minQuantityAfterSell;
    #allowConsiderDebt;

    constructor(Rule1, Rule2, Rule3, Rule4, Rule5) {
        this.#minReceive = Rule1
        this.#minQuantityBeforeReceive = Rule2
        this.#maxDebt = Rule3
        this.#minQuantityAfterSell = Rule4
        this.#allowConsiderDebt = Rule5
    }

    get minReceive(){
        return this.#minReceive
    }

    get minQuantityBeforeReceive(){
        return this.#minQuantityBeforeReceive
    }

    get maxDebt(){
        return this.#maxDebt
    }

    get minQuantityAfterSell(){
        return this.#minQuantityAfterSell
    }

    get allowConsiderDebt(){
        return this.#allowConsiderDebt
    }
}
export default Rule