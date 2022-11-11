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
    set minReceive(value){
        this.#minReceive = value
    }

    get minQuantityBeforeReceive(){
        return this.#minQuantityBeforeReceive
    }
    set minQuantityBeforeReceive(value){
        this.#minQuantityBeforeReceive = value
    }

    get maxDebt(){
        return this.#maxDebt
    }
    set maxDebt(value){
        this.#maxDebt = value
    }

    get minQuantityAfterSell(){
        return this.#minQuantityAfterSell
    }
    set minQuantityAfterSell(value){
        this.#minQuantityAfterSell = value
    }

    get allowConsiderDebt(){
        return this.#allowConsiderDebt
    }
    set allowConsiderDebt(value){
        this.#allowConsiderDebt = value
    }

    sendJSON(){
        return {
            minReceive : this.#minReceive,
            minQuantityBeforeReceive : this.#minQuantityBeforeReceive,
            minQuantityAfterSell : this.#minQuantityAfterSell,
            maxDebt : this.#maxDebt,
            allowConsiderDebt : this.#allowConsiderDebt
        }
    }
}
export default Rule