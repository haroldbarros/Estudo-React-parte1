import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import AutorBox from './views/Autor';
import LivroBox from './views/Livro';
import Home from './views/Home';
import App from './App';

ReactDOM.render(

  <Router>
    <App>
      <Switch>            
          <Route exact path="/" component={Home}/>
          <Route path="/autor" component={AutorBox}/>
          <Route path="/livro" component={LivroBox}/>                
      </Switch>            
    </App>
  </Router>,
  document.getElementById('root')
);
