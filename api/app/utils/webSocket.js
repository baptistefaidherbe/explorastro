const User = require("../models/User");

module.exports = (io) => {
  io.on("connection", (socket) => {
    // On recoit 'pseudo' du fichier html
    socket.on("pseudo", (idUser) => {
      socket.idUser = idUser;

      User.findOne({ idUser: idUser }, (err, user) => {
        if (user) {
          socket.idUser = idUser;
          socket.broadcast.emit("newUser", idUser);
        } else {
          const newUser = new User({
            idUser,
          });
          newUser.save();
        }
      });

      socket.broadcast.emit("newUser", idUser);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("quitUser", socket.idUser);
    });
  });
};
