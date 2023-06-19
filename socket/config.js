const socketIo = (server) => {
  const io = require("socket.io")(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("a user connected " + socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat", (msg) => {
      console.log("receive msg");
      io.emit("chat", msg);
    });
  });
};

module.exports = socketIo;
