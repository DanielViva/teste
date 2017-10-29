var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pgp = require('pg-promise')(/*options*/)
var db = pgp('postgres://postgres:daniel@localhost:5432/Teste')

db.query("create table if not exists prisma_pedidos(id serial primary key, quantidade int, color varchar, entregue timestamp, pago timestamp, cadastro timestamp default current_timestamp;");


app.post("/add", function(request, response) {
    var query = "select * from testetb where id = ${id};"
    console.log(request);
    var parameters = request.body //{ id: 56}    -> ?id=56

    db.any(query, parameters)
    .then(function(data) {
      console.log(data);
      response.send(data)//(data.map(function(obj){return obj["nome"] + " - " + obj["altura"]}));
    }).catch(function(err) {
      console.error(err);
    })

});

app.get("/add", function(request, response) {
    response.send("<form method='post' action='/add'> <input type='text' name='id' /><input type='submit' value='text' /></form>")

});

app.get("/", function(req, res) {
    var pedido = "select * from testetb;"
    var parameters = {}

    db.any(pedido, parameters)
    .then(function(data) {
      console.log(data);
      res.send(data.map(function(obj){return obj["nome"] + " - " + obj["altura"]}));
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
