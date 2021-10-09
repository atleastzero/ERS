const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

let rooms = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/new', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/play', (req, res) => {
  let room = req.body.room
  console.log(room)
})

server.listen(3000, () => {});