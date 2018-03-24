import React from 'react';
import {FormularioAutor,TabelaAutores} from './autor';
import $ from 'jquery';
import Axios from 'axios';

export default class AutorBox extends React.Component{

  constructor() {
    super();    
    this.state = {autores : []};    
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



    render() {
      return(
        <div>
            <FormularioAutor/>
            <TabelaAutores autores={this.state.autores}/>
        </div>
      );
    }
  }