const User = require("../models/User");

module.exports = (io) => {
  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId == userId);
  };

  io.on("connection", (socket) => {
    socket.on("pseudo", (idUser) => {
      User.findOne({ idUser: idUser }, (err, user) => {
        if (user) {
          socket.broadcast.emit("newUser", idUser);
        } else {
          const newUser = new User({
            idUser,
          });
          newUser.save();
        }
      });
    });

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
     
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      console.log(senderId, receiverId, text)
      const user = getUser(receiverId);
      if(user?.socketId){
        console.log(text)
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
      }
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

};

