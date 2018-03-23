const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 //retorna a lista de autores
 var autores = [
                          {id:'1',nome:'harold',email:'harold@gmail.com',senha:'1234'},
                          {id:'2',nome:'joao',email:'joao@gmail.com',senha:'1234'},
                          {id:'3',nome:'maria',email:'maria@gmail.com',senha:'1234'},
                        ];
              


//definie a rota da API no localhost
app.get('/api/autores', (req, res) => {
    //retorna o resultado 
    res.send(autores);
    

});



app.post('/api/autores',function(request,response){
    console.log('/api/autores');

    console.log(request.body);
 
    autores.push(request.body);
    console.log(autores);
    //retorna o resultado 
    response.send(autores);
    

  });




app.get('/api/messages', (req, res) => {
  res.send({ express: 'Este é um codigo do server em node' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));