const account1 = {
  owner: 'Muriel García',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2025-09-26T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2025-09-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'es-ES', // de-DE
};

const account2 = {
  owner: 'Carmen García',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'es-ES',
};

export const state = {
  accounts: [account1, account2],
  currentAccount: null,
};

export const accounts = [account1, account2];

const createUsernames = function (acc) {
  acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
};
state.accounts.forEach(createUsernames);

export const requestLoan = function (amount) {
  state.currentAccount.movements.push(amount);

  //Adding date to loan
  state.currentAccount.movementsDates.push(new Date().toISOString());
  saveAccounts();
};

export const createAccount = function (owner, pin) {
  //Check duplicated usernames
  const exists = state.accounts.some(
    account => account.owner.toLocaleLowerCase() === owner.toLowerCase()
  );
  if (exists) return false;

  const newAccount = {
    owner: owner,
    movements: [],
    interestRate: 1.2,
    pin: pin,
    movementsDates: [],
    currency: 'EUR',
    locale: 'es-ES',
  };
  createUsernames(newAccount);
  state.accounts.push(newAccount);
  saveAccounts();
  return true;
};

export const deleteAccount = function () {
  const index = state.accounts.findIndex(
    acc => acc.username === state.currentAccount.username
  );
  state.accounts.splice(index, 1);
  state.currentAccount = null;
  saveAccounts();
};

export const transferMoney = function (toAcc, amount) {
  state.currentAccount.movements.push(-amount);
  toAcc.movements.push(amount);

  //Adding date to transfers
  state.currentAccount.movementsDates.push(new Date().toISOString());
  toAcc.movementsDates.push(new Date().toISOString());
  saveAccounts();
};

//******************** LOCAL STORAGE ************
const saveAccounts = function () {
  localStorage.setItem('accounts', JSON.stringify(state.accounts));
};

export const loadStorage = function () {
  const storage = loadStorage.getItem('accounts');

  if (storage) {
    state.accounts = JSON.parse(storage);
  }
};
