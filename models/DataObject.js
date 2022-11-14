class DataObject{
    constructor(mensagem, userEmissor, userDestino, chavePublica){
        this.mensagem = mensagem;
        this.userDestino = userDestino;
        this.userEmissor = userEmissor;
        this.chavePublica = chavePublica;
    }
}