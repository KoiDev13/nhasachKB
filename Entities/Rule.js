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

    get MinReceive(){
        return this.#minReceive
    }

    get MinQuantityBeforeReceive(){
        return this.#minQuantityBeforeReceive
    }

    get MaxDebt(){
        return this.#maxDebt
    }

    get MinQuantityAfterSell(){
        return this.#minQuantityAfterSell
    }

    get AllowConsiderDebt(){
        return this.#allowConsiderDebt
    }
}
export default Rule