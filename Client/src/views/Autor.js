/**
 * Componentes relacionados a entidade de autores
 */
import React from 'react';
import $ from 'jquery';
import Axios from 'axios';
import PubSub from 'pubsub-js';
import '../css/pure-min.css';
import '../css/side-menu.css';
import '../css/styles.css';
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoSubmitCustomizado from '../componentes/BotaoSubmitCustomizado';
import TratadorErros from './TratadorErros';


/**
 * AutorBox = Retorna o cadastro e a listagem de autores
 */
export default class AutorBox extends React.Component{

  constructor() {
    super();    
    this.state = {autores : [{id:1,nome:"harold",email:"harold@gmail",senha:"senha"}]}; 
    this.AtualizaListagem = this.AtualizaListagem.bind(this)   
   }


  /**
   * executa web services de autores
   */
  componentDidMount() {
    
    //chama para carregar os dados de autores
    Axios.get('/api/autores/')
      .then(response => {

        console.log(response.data);
        
        //seta o array dos analistas
        this.setState({autores:response.data});
      })
      
      PubSub.subscribe('atualiza-lista-autores', function(topico,novaLista){
        this.setState({autores:novaLista});
      }.bind(this));
  }       

  AtualizaListagem(novoAutores){
    this.setState({autores:novoAutores});
  }

    render() {
      return(
        <div>
            <FormularioAutor/>
            <TabelaAutores autores={this.state.autores}/>
        </div>
      );
    }
  }


class FormularioAutor extends React.Component{

    constructor() {
        super();    
        this.state = {nome:'',email:'',senha:''};   
        this.enviaForm = this.enviaForm.bind(this);     
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);   
      }
  
  

  /**
   * Envento de envio de dados do formulario
   */
  enviaForm(evento){

    //preventDefault: indicará quando não desejamos que um evento continue sendo propagado.
    evento.preventDefault();
    console.log("dados sendo enviados");

    //var jsonData = JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha});
    var jsonData = {nome:this.state.nome,email:this.state.email,senha:this.state.senha};
   
    //executa o Post /api/autores/
    Axios.post('/api/autores/',  jsonData)
    //caso ocorre com sucesso
    .then(function (response) {
     //retorna com a nova lista e atualiza o estado
     PubSub.publish('atualiza-lista-autores',response.data)
    }.bind(this))
    //caso ocorra erro
    .catch(function (error) {
      //chama a classe de tratamento de erro, passando todos os itens
      new TratadorErros().publicaErros(error.response.data.errors);
      console.log("TratadorErros");
    });
    


  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }
  
  setEmail(evento){
    this.setState({email:evento.target.value});
  }
  
  setSenha(evento){
    this.setState({senha:evento.target.value});
  }


  render() {
    return (

    <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
            <InputCustomizado label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}/>                                              
            <InputCustomizado label="E-mail"  id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>                                              
            <InputCustomizado label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}/>                                                  
            <BotaoSubmitCustomizado label="Gravar"/>
        </form>                   
    </div>          

    


    );
  }
}



class TabelaAutores extends React.Component {

  constructor() {
    super();    
   }


    render() {
        return (
            <div>            
                <table className="pure-table pure-table-striped">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.props.autores.map(function(autor){
                          return (
                            <tr key={autor.id}>
                              <td>{autor.nome}</td>
                              <td>{autor.email}</td>
                            </tr>
                          );
                        })
                      }                   
                  </tbody>
                </table> 
            </div>             
           
        ); 
    }
}