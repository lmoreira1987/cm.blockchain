import { Transaction } from './transaction';
import { Block } from "./block";

export class Blockchain {
    
    private _chain : Block[];
    public get chain() : Block[] {
        return this._chain;
    }
    public set chain(v : Block[]) {
        this._chain = v;
    }

    private _pendingTransactions : Transaction[];
    public get pendingTransactions() : Transaction[] {
        return this._pendingTransactions;
    }
    public set pendingTransactions(v : Transaction[]) {
        this._pendingTransactions = v;
    }
    
    difficulty: number;
    miningReward: number;
    
    constructor() {
        this.chain = [this.createGenesisBlock()]        
        this.pendingTransactions = [];

        this.difficulty = 2;
        this.miningReward = 100;
    }

    createGenesisBlock(): Block {
        return new Block(Date.parse("01/02/2017"), [], "0");
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    addTransaction(transaction: Transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address.');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain.')
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address) {
                    balance -= transaction.amount;
                }

                if (transaction.toAddress === address) {
                    balance += transaction.amount;
                }
            }    
        }

        return balance;
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

            if (!currentBlock.hasValidTransaction()) {
                return false;
            }

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