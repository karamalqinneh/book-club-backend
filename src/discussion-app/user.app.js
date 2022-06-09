const users = [];

// join user to the room
function userJoin(id, username, roomID) {
  const user = { id, username, roomID };
  // push user to users array
  users.push(user);
  return user;
}

// get current user using user id
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function leaveRoom(id) {
  const data = users.findIndex((user) => user.id === id);

  if (data !== -1) {
    return users.splice(data, 1)[0];
  }
}

// get user room
function getUserRoom(room) {
  return users.filter((user) => user.roomID === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  leaveRoom,
  getUserRoom,
};
