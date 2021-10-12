const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let rooms = {};
let onlineUsers = {};

io.on('connection', (socket) => {
  require('./sockets/game.js')(io, socket, rooms, onlineUsers)
})

//Express View Engine for Handlebars
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  return res.render('index.handlebars')
})

app.get('/new', (req, res) => {
  roomNum = 1000 + Math.floor(Math.random() * 8999)
  while (rooms[roomNum]) {
    roomNum = 1000 + Math.floor(Math.random() * 8999)
  }
  rooms[roomNum] = []
  return res.redirect('/play/'+ roomNum)
})

// app.get('/play', (req, res) => {
//   let room = req.body.room
//   console.log(room)
//   res.redirect('/play/' + room)
// })

app.get('/play/:roomId', (req, res) => {
  let room = req.params.roomId
  return res.render('play.handlebars', { layout: 'game', room })
})

server.listen(3000, () => {});