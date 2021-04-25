import { Transaction } from './transaction';
import CryptoES from 'crypto-es';

export class Block {

    private _index : any;
    public get index() : any {
        return this._index;
    }
    public set index(v : any) {
        this._index = v;
    }

    private _timestamp : any;
    public get timestamp() : any {
        return this._timestamp;
    }
    public set timestamp(v : any) {
        this._timestamp = v;
    }
    
    private _transactions : Transaction[];
    public get transactions() : Transaction[] {
        return this._transactions;
    }
    public set transactions(v : Transaction[]) {
        this._transactions = v;
    }
    
    private _previousHash : any;
    public get previousHash() : any {
        return this._previousHash;
    }
    public set previousHash(v : any) {
        this._previousHash = v;
    }
    
    private _hash : any;
    public get hash() : any {
        return this._hash;
    }
    public set hash(v : any) {
        this._hash = v;
    }
    
    private _nonce : number;
    public get nonce() : number {
        return this._nonce;
    }
    public set nonce(v : number) {
        this._nonce = v;
    }

    /**
     * index = where the block sits on the chain
     * timestamp = when the block was created
     * data = any type of data associated with this block
     * previousHash = contains the hash of the block before this one
     */
    constructor(timestamp: any, transactions: any, previousHash: any = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return CryptoES.SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty: number) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }

    hasValidTransaction() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}