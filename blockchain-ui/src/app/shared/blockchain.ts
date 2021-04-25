import { Block } from "./block";

export class Blockchain {
    
    private _chain : any;
    public get chain() : any {
        return this._chain;
    }
    public set chain(v : any) {
        this._chain = v;
    }
    

    /**
     *
     */
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock(): Block {
        return new Block(0, "01/02/2017", "Genesis block", "0");
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    /**
     * This is used to add a new block onto the chain
     * @param newBlock A new block to be added onto the chain
     */
    addBlock(newBlock: Block) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}