const createUsernames = function (name) {
  const username = name
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  return username;
};

const calcDisplayBalance = function (array) {
  const balance = array.reduce((counter, value) => counter + value, 0);
  return balance;
};

const transferMoney = function (currentAccount, receiverAccount, amount) {
  if (
    receiverAccount &&
    currentAccount.balance > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount !== currentAccount
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    return true;
  } else return false;
};

module.exports = {
  createUsernames,
  calcDisplayBalance,
  transferMoney,
};
