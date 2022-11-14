const bigInt = require('big-integer');
const Keys = require('../models/Keys');

class RSA {
  static randomPrime(bits) {
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();
    
    while (true) {
      let p = bigInt.randBetween(min, max);
      if (p.isProbablePrime(256)) {
        return p;
      } 
    }
  }

  static generate(keysize) {
    const e = bigInt(65537);
    let p;
    let q;
    let totient;
  
    do {
      p = this.randomPrime(keysize / 2);
      q = this.randomPrime(keysize / 2);
      totient = bigInt.lcm(
        p.prev(),
        q.prev()
      );
    } while (bigInt.gcd(e, totient).notEquals(1) || p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero());
    var keys = new Keys({publicKey:p.multiply(q),
                        privateKey : e.modInv(totient),
                        e:e})
   
    return keys;
  }

  static encrypt(encodedMsg, n, e) {
    var en = this.encode(encodedMsg);
    return bigInt(en).modPow(e, n);
  }

  static decrypt(encryptedMsg, d, n) {
    var encodedMsg = bigInt(encryptedMsg).modPow(d, n);
    return this.decode(encodedMsg); 
  }

   static decode (code) {
    const stringified = code.toString();
    let string = '';
  
    for (let i = 0; i < stringified.length; i += 2) {
      let num = Number(stringified.substr(i, 2));
      
      if (num <= 30) {
        string += String.fromCharCode(Number(stringified.substr(i, 3)));
        i++;
      } else {
        string += String.fromCharCode(num);
      }
    }
  
    return string;
  }
   static encode (str) {
    const codes = str
      .split('')
      .map(i => i.charCodeAt())
      .join('');
  
    return bigInt(codes);
  }

  
}


module.exports = RSA;