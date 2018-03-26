/**
 * SERVIDOR NODE JS
 */


const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 //retorna a lista de autores
 var autores = [
                          {id:1,nome:'harold',email:'harold@gmail.com',senha:'1234'},
                          {id:2,nome:'joao',email:'joao@gmail.com',senha:'1234'},
                          {id:3,nome:'maria',email:'maria@gmail.com',senha:'1234'},
                        ];
              
var nKey = 3;

/**
 * GET /api/autores
 * Retorna com a lista de autores cadastrados no array
 */
app.get('/api/autores', (req, res) => {
    //retorna o resultado 
    res.send(autores);
});


/**
 * Post /api/autores 
 * Inclui um novo autor no array
 */
app.post('/api/autores',function(request,response){
    
  nKey = nKey + 1;

    var autor = {id:nKey,
                 nome:request.body.nome,
                 email:request.body.email,
                 senha:request.body.senha}

    autores.push(autor);
    response.send(autores);
  });




app.get('/api/messages', (req, res) => {
  res.send({ express: 'Este é um codigo do server em node' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));