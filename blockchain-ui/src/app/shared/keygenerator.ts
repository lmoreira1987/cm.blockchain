const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const privateKey = key.getPrivate('hex');
const publicKey = key.getPublic('hex');

console.log();
console.log('Private key: ', privateKey);
//Private key:  cf49ba0b1aa1a7d33ad911d58f65e253264f238ca4362ec7cc2793a9b84d40a9

console.log();
console.log('Public key: ', publicKey);
//Public key:  0421c2fd628917e6f31dc5dc7cd71f4f22bf2c4092f42d359ab65e7a80f6134e8f4512dc84c17def9381a5d2aa5daf1be3320736c8f9de64ca73e87e3c7dc3d0db


