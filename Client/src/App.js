import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import Axios from 'axios';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();    
    this.state = {autores : [],nome:'',email:'',senha:''};    
    this.enviaForm = this.enviaForm.bind(this);     
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);   
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
<div id="layout">
    
    <a href="#menu" id="menuLink" className="menu-link">
        
        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
        </div>
    </div>

        <div id="main">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                        <div className="pure-control-group">
                                    <label htmlFor="nome">Nome</label>
                                    <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}/>
                                </div>
                                <div className="pure-control-group">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                                </div>
                                <div className="pure-control-group">
                                    <label htmlFor="senha">Senha</label>
                                    <input id="senha" type="password" name={this.state.senha} onChange={this.setSenha}/>
                                </div>
                                <div className="pure-control-group">
                                    <label></label>
                                    <button type="submit" className="pure-button pure-button-primary">Gravar
                                    </button>
                                </div>
                      </form>                      

              </div>  
              <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.autores.map(function(autor){
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
            </div>
          </div>            


</div>     
    );
  }
}

export default App;
