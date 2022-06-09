"use strict";

const database = require("../database/models/index");
const {
  userJoin,
  getCurrentUser,
  leaveRoom,
  getUserRoom,
} = require("./user.app");

let messageBox = "room";
function getCurrentTime() {
  let messageDate = new Date();
  let hour = messageDate.getHours();
  let min = messageDate.getMinutes();
  let messageTime = hour + ":" + min + " ";
  return messageTime;
}
// when clinet get connect run
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("joinRoom", async ({ username, roomID }) => {
      const user = userJoin(socket.id, username, roomID);
      socket.join(roomID);
      // to see the message history
      // we need to create message database
      async function getPostsHistory() {
        let messageHistory = await database.discussions_history
          .findAll({ where: { room_id: roomID } })
          .then((model) => {
            for (let item of model) {
              let messageDate = new Date(item.createdAt);
              let hour = messageDate.getHours();
              let min = messageDate.getMinutes();
              let postTime = hour + ":" + min + " ";
              socket.emit("post", {
                username: item.user.full_name,
                time: postTime,
                text: item.message,
              });
            }
          });
      }
      getPostsHistory();

      // welcome message
      socket.emit("post", { text: "Welcome" });

      // user joind message
      let messageTime = getCurrentTime();
      socket.broadcast.to(user.roomID).emit("post", {
        username: user.full_name,
        time: messageTime,
        text: `${user.full_name} has joined the room`,
      });

      // send user and room data
      io.to(user.roomID).emit("userRoom", {
        roomID: user.roomID,
        users: getUserRoom(user.roomID),
      });
    });

    // listen to room message
    socket.on("post", (msg) => {
      const user = getCurrentUser(socket.id);

      let messageTime = getCurrentTime();
      io.to(user.roomID).emit("post", {
        username: user.username,
        time: messageTime,
        text: msg,
      });
      // database.discussions_history.create({
      //   message: msg,
      //   user_id: user.username,
      //   room_id: user.roomID,
      // });
    });

    // when clinet disconnect
    socket.on("disconnect", () => {
      const user = leaveRoom(socket.id);
      let messageTime = getCurrentTime();
      if (user) {
        io.to(user.roomID).emit("post", {
          username: user.username,
          time: messageTime,
          text: `${user.username} has left the room`,
        });

        // send users and room data
        io.to(user.roomID).emit("userRoom", {
          roomID: user.roomID,
          users: getUserRoom(user.roomID),
        });
      }
    });
  });
};
