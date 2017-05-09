var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')

var server = express()
var port = 4545
var connectionstring = 'mongodb://sgt:student@ds031988.mlab.com:31988/books'
var connection = mongoose.connection;

mongoose.connect(connectionstring, {
  server: {socketOptions:{keepAlive: 300000, connectTimeoutMS: 30000}},
  replset: {socketOptions:{keepAlive: 300000, connectTimeoutMS: 30000}}
})
connection.on('error', function(err){//I am listening any time the event error to happen...
  console.log('There is a connection problem', err)
})
connection.once('open',function(){ //I am listening for the event open to happen one time, if it happens I will open one time
  console.log('We are connected...')
  server.listen(port, function(){
    console.log('Working!!', 'http://localhost:' + port)

  })
})

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(cors())
server.use('/', express.static(`${__dirname}/public/`))

//ABOVE THIS LINE MOST STUFF SAME, EXECPT THE CONNECTIONSTRING

//SCHEMA FOR OUR OBJECT: STRUCTURE OF OUR OBJ
var Schema = mongoose.Schema
var BookSchema = new Schema({
  title:{type: String, required: true},
  author:{type: String, required: true},
  rating: {type: Number, default: 1},
  published: {type: String}//could use Date instead of String! But Dates are weird!

})

var Book = mongoose.model('Book', BookSchema)

server.get('/', function(req, res, next){
  res.send('Kitties love books!!!')
})

server.get('/books', function(req, res, next){
  Book.find({}).then(function(books){//({})find me anything that is an obj, .then=take what found and run this function, books is what you call the stuff you got back from the ({}), ({}) returns a promise...
    res.send(books)
  }) 
})

server.post('/books', function(req, res, next){
  var newBook = req.body
  Book.create(newBook).then(function(createdBook){
    res.send(createdBook)
  })
})






































