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
    var block = new Blockchain()
    block.addBlock(new Block(1, "10/07/2017", {amount: 4}));
    block.addBlock(new Block(1, "12/07/2017", {amount: 10}));

    console.log(JSON.stringify(block, null, 4, )); 
  }  
}
