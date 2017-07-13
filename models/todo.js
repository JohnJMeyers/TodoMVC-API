/*
NOTE The JSON form of the todos sent back and forth via the JSON API looks like this:
 {id: 1, title: "Mow the lawn", order: 1, completed: false}
 */

const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {type: String, required: true},
  order: {type: String, required: true},
  completed: {type: Boolean, required: true}
})

const Todos = mongoose.model('Todos', todoSchema)

module.exports = Todos
