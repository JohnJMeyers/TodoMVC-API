const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Todos = require('./models/todo')

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/todos');

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})


app.get('/api/todos', function(req, res){
  Todos.find()
  .then(function(todos){
    res.json(todos)
  }).catch(function(error){
    console.log(error)
  })
})


app.post('/api/todos', function(req, res){
  const todo = new Todos()
  todo.title = req.body.title
  todo.order = req.body.order
  todo.completed = req.body.completed
  todo.save()
  .then(function(todo){
    res.json(todo)
  }).catch(function(error){
    console.log('###' + error + '###')
  })
})


app.get('/api/todos/:id', function(req,res){
  let id = req.params.id
  Todos.findOne({
    _id: id
  }).then(function(todo){
    res.json(todo)
  }).catch(function(error){
    console.log(error)
  })
})


app.put('/api/todos/:id', function(req,res){
  let id = req.params.id
  Todos.findOne({
    _id: id
  }).then(function(todo){
    todo.title = req.body.title
    todo.order = req.body.order
    todo.completed = req.body.completed
    todo.save()
    res.json(todo)
  }).catch(function(error){
    console.log(error)
  })
})


app.patch('/api/todos/:id', function(req,res){
  let id = req.params.id
  Todos.findOne({
    _id: id
  }).then(function(todo){
    todo.title = req.body.title
    todo.order = req.body.order
    todo.completed = req.body.completed
    todo.save()
    .then(function(req,res){
      res.json(todo)
    })
  }).catch(function(error){
    console.log(error)
  })
})


app.delete('/api/todos/:id', function(req,res){
  let id = req.params.id
  Todos.deleteOne({
    _id: id
  }).then(function(todo){
      res.json(todo)
  })
  .catch(function(error){
    console.log(error)
  })
})


app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
