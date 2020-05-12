var express = require("express");
var fs = require("fs");
var app = express();
var db = require("./db/db");
var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.set("Content-type", "text-html");
  res.end(
    "<html><head></head>" +
      "<body><h2>Rotas MVC</h2> " +
      "<li><a href=/mvc>Cadastro</a></li>" +
      "<li><a href=/consulta>Consulta</a></li>" +
      "</body></html>"
  );
});

app.get("/mvc", function (req, res) {
  res.sendFile(path.join(__dirname + "/cadastro.html"));
});

app.post("/addusuario", function (req, res) {
  var User = db.Mongoose.model("usuarios", db.UserSchema, "usuarios");
  var meusDados = new User(req.body);

  meusDados
    .save()
    .then((item) => {
      res.set("Content-type", "text/html");
      res.end("<br/>Dados Gravados<br/>" + "<a href=/>Voltar</a>");
    })
    .catch((err) => {
      res.set("Content-type", "text/html");
      res.end(
        "<br/>Dados Nao Gravados - Verificar Server<br/>" +
          "<a href=/>Voltar</a>"
      );
    });
});

app.get("/consulta", function (req, res, next) {
  var User = db.Mongoose.model("usuarios", db.UserSchema, "usuarios");
  User.find({})
    .lean()
    .exec(function (e, docs) {
      res.json(docs);
      res.end();
    });
});

app.get("/consulta/umRegistro", function (req, res, next) {
  let vnome = req.query.nome;
  var User = db.Mongoose.model("usuarios", db.UserSchema, "usuarios");
  User.findOne({ nome: vnome })
    .lean()
    .exec(function (e, docs) {
      res.json(docs);
      res.end();
    });
});

app.get("/consulta/nome2", function (req, res, next) {
  var variavel = req.query;
  var chave = "";
  var conteudo = "";
  for (var key in variavel) {
    chave = key;
    conteudo = req.query[key];
  }
  res.json(chave + " - " + conteudo + ", =>" + req.query.nome);
});

var server = app.listen(process.env.PORT || 5001, "localhost", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening http://%s:%s", host, port);
});
