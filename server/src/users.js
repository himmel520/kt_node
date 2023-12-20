let users = [];

const trimStr = (str) => str.trim().toLowerCase();

const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find(
    (u) =>
      trimStr(u.name) === userName &&
      trimStr(u.room) === userRoom &&
      u.color.trim() === user.color.trim()
  );
};

const addUser = (user) => {
  const isExist = findUser(user);
  !isExist && users.push(user);

  const currentUser = isExist || user;

  return { isExist: !!isExist, user: currentUser };
};

const getRoomUsers = (room) => users.filter((u) => u.room === room);

const removeUser = (user) => {
  const found = findUser(user);

  if (found) {
    users = users.filter(
      ({ room, name, color }) =>
        room === found.room && name !== found.name && color !== found.color
    );
  }

  return found;
};

module.exports = { addUser, findUser, getRoomUsers, removeUser };

