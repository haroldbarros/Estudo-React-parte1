/**
 * SERVIDOR NODE JS
 * OBS: nao tem interação com banco apenas dados mokados
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


//Configura os Midwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 //lista de autores
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


const EMPTY_STRING = ''

/**
 * Post /api/autores 
 * Inclui um novo autor no array
 */
app.post('/api/autores', [
  check('email')
    .isEmail().withMessage('E-mail inválido'),
  // General error messages can be given as a 2nd argument in the check APIs
  check('senha', 'a senha deve ter no minimo 6 caracteres')
    .isLength({ min: 6 }),
  check('nome', 'nome deve ser preenchido')
    .not().isEmpty(),

 

  ], (req, res, next) => {
    console.log(req.body.nome);
  // Get the validation result whenever you want; see the Validation Result API for all options!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('houve erro');
    var ListErrors = { errors: errors.mapped() }
    console.log(ListErrors);
    return res.status(422).json(ListErrors);
  }

  //incrementa a chave primária
  nKey = nKey + 1;

  //cria o objeto de autor com base nos dados que vieram no corpo do e-mail
  var autor = {id:nKey,
                nome:req.body.nome,
                email:req.body.email,
                senha:req.body.senha}


  console.log('passou ok');
});






//lista de autores
var livros = [
  {id:1,titulo:'livro AAA',preco:10.00,autorid:1,"autor":{id:1,nome:"harold"}},
  {id:2,titulo:'livro BBB',preco:20.00,autorid:2,"autor":{id:2,nome:"joao"}},
  {id:3,titulo:'livro CCC',preco:30.00,autorid:3,"autor":{id:3,nome:"maria"}},
];

var nKeyLivros = 3;

/**
* GET /api/autores
* Retorna com a lista de autores cadastrados no array
*/
app.get('/api/livros', (req, res) => {
//retorna o resultado 
res.send(livros);
});




app.listen(port, () => console.log(`Listening on port ${port}`));