const users = [];

// join user to community chat
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

// user leve community chat using his id
function leveRoom(id) {
  const data = users.findIndex((user) => user.id === id);

  if (data !== -1) {
    return users.splice(data, 1)[0];
  }
}

// get user community
function getUserRoom(room) {
  return users.filter((user) => user.roomID === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  leveRoom,
  getUserRoom,
};
