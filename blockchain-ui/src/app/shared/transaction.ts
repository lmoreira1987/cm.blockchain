import CryptoES from 'crypto-es';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export class Transaction {
    
    private _fromAddress : any;
    public get fromAddress() : any {
        return this._fromAddress;
    }
    public set fromAddress(v : any) {
        this._fromAddress = v;
    }
    
    private _toAddress : any;
    public get toAddress() : any {
        return this._toAddress;
    }
    public set toAddress(v : any) {
        this._toAddress = v;
    }

    private _amount : any;
    public get amount() : any {
        return this._amount;
    }
    public set amount(v : any) {
        this._amount = v;
    }

    
    private _signature : any;
    public get signature() : any {
        return this._signature;
    }
    public set signature(v : any) {
        this._signature = v;
    }
    
    
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }    

    calculateHash(): string {
        return CryptoES.SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets.');
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction.');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}