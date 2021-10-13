module.exports = (io, socket, rooms, nicknames) => {
  socket.on('new user', (username, roomId) => {
    nicknames[socket.id] = username
    socket['username'] = username

    if (rooms[roomId]) {
      rooms[roomId].push(socket.id)
    } else {
      rooms[roomId] = [socket.id]
    }

    io.emit('new user', username)
    const players = rooms[roomId]
    io.emit('get players', players, nicknames)
  })

  socket.on('get players', (roomId) => {
    const players = rooms[roomId]
    io.emit('get players', players, nicknames)
  })
}