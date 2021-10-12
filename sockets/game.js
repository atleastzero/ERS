module.exports = (io, socket, onlineUsers) => {
  socket.on('new user', (username) => {
    onlineUsers[username] = socket.id
    socket['username'] = username

    io.emit("new user", username)
  })
}