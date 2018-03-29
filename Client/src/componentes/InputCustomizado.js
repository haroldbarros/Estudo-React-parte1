import React from 'react';
import PubSub from 'pubsub-js';
import '../css/styles.css';


export default class InputCustomizado extends React.Component{

  /** contrutor */
  constructor(){
    super();
      this.state = {msgErro:''};
  };

  /** evento ao exibir o componente */
  componentDidMount() {

    //escuta o canal erro-validacao e dispara a funçao quando o estado for atualizado
    PubSub.subscribe("erro-validacao",function(topico,erro){
      console.log('subscribe:erro-validacao');
      console.log(erro);

      //verifica se o erro se destina ao componente atual
      if(erro.param === this.props.name){
          //seta novo estado do erro afim de exibir o mesmo na tela
          this.setState({msgErro:erro.msg});
      }
    }.bind(this));    
  };

  /** VISUAL */
  render() {
      return(
        <div className="pure-pure-control-group">
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <input id={this.props.id} type={this.props.type} name={this.props.nome} value={this.props.value} onChange={this.props.onChange}/>
          <span className="erro" styles="color:red">  {this.state.msgErro}</span>
        </div>
    );
  }
}