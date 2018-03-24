import React, { Component } from 'react';
import '../css/pure-min.css';
import '../css/side-menu.css';
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoSubmitCustomizado from '../componentes/BotaoSubmitCustomizado';


export class FormularioAutor extends Component{

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
   
    Axios.post('/api/autores/',  jsonData)
    .then(function (response) {
      console.log(response);
      console.log("enviado com sucesso");
      this.setState({autores:response.data});
    }.bind(this))
    .catch(function (error) {
      console.log(error);
      console.log("erro");
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



export class TabelaAutores extends Component {

  



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
                        this.state.props.autores.map(function(autor){
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