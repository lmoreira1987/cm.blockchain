import { Block } from "./block";

export class Blockchain {
    
    private _chain : Block[];
    public get chain() : Block[] {
        return this._chain;
    }
    public set chain(v : Block[]) {
        this._chain = v;
    }

    difficulty: number;
    
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 5;
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
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}