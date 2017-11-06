var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pgp = require('pg-promise')(/*options*/)
var db = pgp('postgres://postgres:daniel@localhost:5432/Teste')

db.query("create table if not exists prisma_pedidos(id serial primary key, quantidade int, color varchar, entregue timestamp, pago timestamp, cadastro timestamp default current_timestamp);");
db.query("create table if not exists prisma_estoque(id serial primary key, quantidade int, color varchar, cadastro timestamp default current_timestamp);");


app.post("/add", function(request, response) {
    var query = "insert into prisma_pedidos (quantidade, color) values (${quantidade}, ${color});"
    var parameters = request.body

    db.any(query, parameters)
    .then(function(data) {
      console.log(data);
      response.redirect("/")
          }).catch(function(err) {
      console.error(err);
    })

});

app.get("/entregue", function(request, response) {
    var query = "update prisma_pedidos set entregue = now() where id = (${id});;"
    var parameters = request.query

    db.any(query, parameters)
    .then(function(data) {
      console.log(data);
      response.redirect("/")
          }).catch(function(err) {
      console.error(err);
    })

});

app.post("/stock", function(request, response) {
    var query = "insert into prisma_estoque (quantidade, color) values (${quantidade}, ${color});"
    var parameters = request.body //{ id: 56}    -> ?id=56

    db.any(query, parameters)
    .then(function(data) {
      console.log(data);
      response.redirect("/")
    }).catch(function(err) {
      console.error(err);
    })

});


app.get("/", function(request, response) {
    response.send("<form method='post' action='/add'> <input type='text' name='quantidade' /> <br> <input type='text' name='color' /><br>  <input type='submit' value='pedido' /></form> <br> <br> <br> <br> <form method='post' action='/stock'> <input type='text' name='quantidade' /> <br> <input type='text' name='color' /><br>  <input type='submit' value='ADD estoque' /></form>")

});

 app.get("/abertos", function(req, res) {
          var pedido = "select * from prisma_pedidos where entregue is null;"
     var parameters = {}

     db.any(pedido, parameters)
     .then(function(data) {
       console.log(data);
      res.send(data);
    }).catch(function(err) {
      console.error(err);
    })

});

//db.query("create table if not exists testetb(id serial primary key, nome varchar, idade int, altura real, created timestamp default current_timestamp;");
//insert into testetb (nome,altura,idade) values('daniel',1.85,18);
//select * from testetb order by altura;
//update testetb set idade=idade+1 where id=2;
//alter table testetb add edit timestamp;
//create trigger timeedit before update on testetb for each row execute procedure update_edit();
//creat function update_edit()
//db

app.listen(8080, function() {
console.log("Inciado");


});
