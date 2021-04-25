import { Component, OnInit } from '@angular/core';
import { Block } from './shared/block';
import { Blockchain } from './shared/blockchain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blockchain-ui';

  ngOnInit() {
    var blockchain = new Blockchain()
    blockchain.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
    blockchain.addBlock(new Block(2, "12/07/2017", { amount: 10 }));

    console.log(JSON.stringify(blockchain, null, 4,));
    console.log('Is blockchain valid?', blockchain.isChainValid());

    blockchain.chain[1].data = { amount: 100 };
    blockchain.chain[1].hash = blockchain.chain[1].calculateHash();
    console.log('Is blockchain valid?', blockchain.isChainValid());
  }
}
