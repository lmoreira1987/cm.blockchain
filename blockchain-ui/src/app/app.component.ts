import { Component, OnInit } from '@angular/core';
import { Blockchain } from './shared/blockchain';
import { Transaction } from './shared/transaction';

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blockchain-ui';

  ngOnInit() {
    const myKey = ec.keyFromPrivate('cf49ba0b1aa1a7d33ad911d58f65e253264f238ca4362ec7cc2793a9b84d40a9');
    const myWalletAddress = myKey.getPublic('hex');

    var blockchain = new Blockchain()

    const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
    tx1.signTransaction(myKey);

    blockchain.addTransaction(tx1);

    console.log('\n Starting the miner...');
    blockchain.minePendingTransactions(myWalletAddress);

    console.log('\nBalance of xavier is: ', blockchain.getBalanceOfAddress(myWalletAddress));

    // blockchain.chain[1].transactions[0].amount = 1;

    console.log('Is chain valid?', blockchain.isChainValid()); 
  }
}
