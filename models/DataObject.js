const Keys = require("./Keys");

class DataObject{
    constructor(data){
        this.mensagem = data.mensagem;
        this.userDestino = data.userDestino;
        this.userEmissor = data.userEmissor;
        this.keys = new Keys(data.keys);
    }
}
module.exports = DataObject;