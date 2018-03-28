import PubSub from 'pubsub-js';

export default class TratadorErros {
  publicaErros(errors){

    //passa por todos os itens 
    for (var x in errors)   
    {  
        //recupera a mensagem de erro
        var erro = errors[x];
        console.log(erro);
        //publica a mensagem de erro no canal erro-validacao
        PubSub.publish("erro-validacao",erro);
    }  
  }
}