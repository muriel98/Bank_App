const createUsernames = function (name) {
  const username = name
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  return username;
};

module.exports = {
  createUsernames,
};
