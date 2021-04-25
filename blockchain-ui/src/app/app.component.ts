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

    console.log('Mining block 1...');
    blockchain.addBlock(new Block(1, "10/07/2017", { amount: 4 }));

    console.log('Mining block 2...');
    blockchain.addBlock(new Block(2, "12/07/2017", { amount: 10 }));
  }
}
