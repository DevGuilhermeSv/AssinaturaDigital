const Keys = require("./Keys");

class Signature{
    constructor(data){
        this.mensageSign = data.mensageSign;
        this.mensage = data.mensage;
        this.keys = new Keys(data.keys);
    }
}

module.exports = Signature;