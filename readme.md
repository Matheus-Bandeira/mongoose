# Mongodb banco de dados nosql

# 27017 (porta)
# mongoose
# start no banco de dados

sudo mongod 
# entrei no banco de dados

sudo mongo

# entra e cria o banco
use banco00;

db.usuarios.insertOne({
 "nome":"soneca",
 "email":"soneca@gmail.com"
});
db;

db.usuario.find().pretty();
