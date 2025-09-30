'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
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
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//Updates movements in the interface
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movements: mov,
    date2: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovsDates.sort((a, b) => a.movements - b.movements);
  console.log(combinedMovsDates);
  combinedMovsDates.forEach(function (obj, i) {
    const { movements, date2 } = obj;

    const type = movements > 0 ? 'deposit' : 'withdrawal';

    const dateLabel = new Date(date2);

    const day = `${dateLabel.getDate()}`.padStart(2, 0);
    const month = `${dateLabel.getMonth() + 1}`.padStart(2, 0);
    const year = dateLabel.getFullYear();

    const movDate = `${day}/${month}/${year}`;

    const html = `<div class="movements__row">
       <div class="movements__type      movements__type--${type}">
      ${i + 1}
       ${type} </div>
        <div class="movements__date">${movDate} </div>
      <div class="movements__value">${movements.toFixed(2)} € </div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Calculates and displays the balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} € `;
};

//Calculates and displays the summary
const calcDisplaySummary = function (account) {
  const inMoney = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${inMoney.toFixed(2)} €`;

  const outMoney = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outMoney.toFixed(2))} €`;
  //Interests
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((acc, dep) => acc + dep, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

//Creates username in each object
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);

//Login function

let currentAccount;

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);
  //Display Balance
  calcDisplayBalance(acc);
  //Display Sumary
  calcDisplaySummary(acc);
};

//DELETE
currentAccount = account1;
updateUI(account1);
containerApp.style.opacity = 100;

//Addind date to label
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const minutes = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

btnLogin.addEventListener('click', function (event) {
  //Prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount.pin === +inputLoginPin.value) {
    //Logo Animation with GSAP
    gsap.to('.logo', {
      duration: 1.2,
      scale: 0.55,
      y: '-340 vh',
      ease: 'power3.out',
    });

    //Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    } `;
    containerApp.style.opacity = 100;

    //Clear user and pin fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    //make pin lose the focus
    inputLoginUsername.classList.add('fade_out');
    inputLoginPin.classList.add('fade_out');
    inputLoginPin.blur();
    updateUI(currentAccount);

    //Add different style to even rows
    [...document.querySelectorAll('.movements__row')].forEach(function (
      row,
      index
    ) {
      if (index % 2 === 0) {
        row.style.backgroundColor = '#f0f0f0ff';
      }
    });
  }
});

//Transfer money Function
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receiverAccount = accounts.find(
    accs => accs.username === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);

  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
  if (
    receiverAccount &&
    currentAccount.balance > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount !== currentAccount
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    //Adding date to transfers
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  }
});

//Loan function
//Only accept when any deposit > 10% of the request
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    //Adding date to loan
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

//Delete account Function
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

//Sort Movements Function
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
