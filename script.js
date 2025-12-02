'use strict';

// Data
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

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const titleLogo = document.querySelector('.logo_title');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnLogOut = document.querySelector('.logout__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const formatMovementDate = function (dateLabel, local) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), dateLabel);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return ' Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago `;

  return new Intl.DateTimeFormat(local).format(dateLabel);
};
const formatCurrencies = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//Updates movements in the interface
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movements: mov,
    date2: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovsDates.sort((a, b) => a.movements - b.movements);

  combinedMovsDates.forEach(function (obj, i) {
    const { movements, date2 } = obj;

    const type = movements > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const movDate = formatMovementDate(date, acc.locale);

    const formatedMov = formatCurrencies(
      obj.movements,
      acc.locale,
      acc.currency
    );
    console.log(formatedMov);
    const html = `<div class="movements__row">
       <div class="movements__type      movements__type--${type}">
      ${i + 1}
       ${type} </div>
        <div class="movements__date">${movDate} </div>
      <div class="movements__value">${formatedMov}
      </div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Calculates and displays the balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCurrencies(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

//Calculates and displays the summary
const calcDisplaySummary = function (account) {
  const inMoney = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCurrencies(
    inMoney,
    account.locale,
    account.currency
  )}`;

  const outMoney = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCurrencies(
    Math.abs(outMoney),
    account.locale,
    account.currency
  )}`;

  //Interests
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((acc, dep) => acc + dep, 0);
  labelSumInterest.textContent = `${formatCurrencies(
    interest,
    account.locale,
    account.currency
  )}`;
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

let currentAccount;

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);
  //Display Balance
  calcDisplayBalance(acc);
  //Display Sumary
  calcDisplaySummary(acc);
};

//Back to main page function
const logout = function () {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = '';
  inputLoginUsername.classList.remove('fade_out');
  inputLoginPin.classList.remove('fade_out');
  btnLogOut.classList.remove('fade_in');
  gsap.to('.logo', {
    duration: 1,
    scale: 1,
    yPercent: 0,
    ease: 'power3.inOut',
  });
};

let timer;

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min} : ${sec} `;

    if (time === 0) {
      clearInterval(timer);
      logout();
    }
    time--;
  };
  let time = 200;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// ---------------------- EVENTS -------------------
//Login function
btnLogin.addEventListener('click', function (event) {
  //Prevent form from submitting
  event.preventDefault();

  //Inizializing timer
  clearInterval(timer);
  timer = startLogOutTimer();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount.pin === +inputLoginPin.value) {
    //Logo Animation with GSAP
    gsap.to('.logo', {
      duration: 1.2,
      scale: 0.55,
      yPercent: -120,
      transformOrigin: 'top center',
      ease: 'power3.out',
    });
    titleLogo.classList.add('fade_out');

    //Experimenting API
    const now = new Date();

    //Internationalizing Date
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };

    //const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Display logout button

    btnLogOut.classList.add('fade_in');
    btnLogin.classList.add('fade_out');

    //Display UI and message
    labelWelcome.textContent = `Bienvenido, ${
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

  //Inizializing timer
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

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

  //Inizializing timer
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

  const amount = Math.floor(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);

      //Adding date to loan
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  if (timer) {
    clearInterval(timer);
    timer = startLogOutTimer();
  }
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

//Logout Function
btnLogOut.addEventListener('click', function (e) {
  e.preventDefault();
  logout();
});

//Sort Movements Function
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
