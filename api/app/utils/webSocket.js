const User = require("../models/User");

module.exports = (io) => {
  io.on("connection", (socket) => {
    // On recoit 'pseudo' du fichier html
    socket.on("pseudo", (pseudo) => {
      socket.pseudo = pseudo;

      User.findOne({ pseudo: pseudo }, (err, user) => {
        if (user) {
          socket.pseudo = pseudo;
          socket.broadcast.emit("newUser", pseudo);
        } else {
          const newUser = new User({
            pseudo,
          });
          newUser.save();
        }
      });

      socket.broadcast.emit("newUser", pseudo);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("quitUser", socket.pseudo);
    });
  });
};
