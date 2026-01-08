import * as model from './model.js';
import view from './view.js';

let timer;
let sorted = false;

const startLogOutTimer = function () {
  let time = 200;
  const tick = function () {
    view.updateTimer(time);
    if (time === 0) {
      clearInterval(timer);
      view.logout();
    }
    time--;
  };
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};

const formatCurrencies = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const controlCreateAccount = function () {
  const { user, pin } = view.getSignUpData();

  if (!user || !pin) {
    view.renderMessage(
      'Rellena ambos campos para crear un usuario',
      'error',
      false
    );
    view.resetSignUp();

    return;
  }
  const isCreated = model.createAccount(user, pin);
  if (!isCreated) {
    view.renderMessage(
      'Parece que ya tienes una cuenta con nosotros, prueba a iniciar sesión',
      'error'
    );
    view.resetSignUp();
    view.showSignUpForm();
  } else {
    view.renderMessage('Cuenta creada con éxito', 'success');
    view.showLogoPage();
  }
};

//Calculates and displays the summary
const calcDisplaySummary = function (account) {
  const inMoney = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const plusMoney = `${formatCurrencies(
    inMoney,
    account.locale,
    account.currency
  )}`;

  const outMoney = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const minusMoney = `${formatCurrencies(
    Math.abs(outMoney),
    account.locale,
    account.currency
  )}`;

  //Interests
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((acc, dep) => acc + dep, 0);
  const totalInterest = `${formatCurrencies(
    interest,
    account.locale,
    account.currency
  )}`;
  view.displaySummary(plusMoney, minusMoney, totalInterest);
};

const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const totalBalance = `${formatCurrencies(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
  view.DisplayBalance(totalBalance);
};

const updateUI = function (acc) {
  //Display movements
  view.displayMovements(acc);
  //Display Balance
  calcBalance(acc);
  //Display Sumary
  calcDisplaySummary(acc);
};

//Login function
const controlLogin = function () {
  //Inizializing timer
  clearInterval(timer);
  timer = startLogOutTimer();
  const { user, pin } = view.getLoginData();

  model.state.currentAccount = model.state.accounts.find(
    acc => acc.username === user || acc.owner === user
  );

  if (model.state.currentAccount?.pin === pin) {
    view.animateLogin();
    view.displayHeaderDate(model.state.currentAccount);
    view.showApp(model.state.currentAccount);

    updateUI(model.state.currentAccount);
    view.rowsStyle();
  } else {
    view.renderMessage('Los datos no son correctos', 'error', false);
    view.resetLogin();
  }
};

//Loan function
//Only accept when any deposit > 10% of the request
const controlLoan = function () {
  //Inizializing timer
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

  const amount = view.getLoanAmount();

  if (
    amount > 0 &&
    model.state.currentAccount.movements.some(mov => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      model.requestLoan(amount);

      updateUI(model.state.currentAccount);
    }, 3000);
  }

  if (timer) {
    clearInterval(timer);
    timer = startLogOutTimer();
  }
};

//Transfer money Function
const controlTransfer = function () {
  const { to, amount } = view.getTransferData();

  //Inizializing timer
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

  const receiverAccount = model.state.accounts.find(
    accs => accs.username === to
  );

  if (
    receiverAccount &&
    model.state.currentAccount.balance > 0 &&
    model.state.currentAccount.balance >= amount &&
    receiverAccount !== model.state.currentAccount
  ) {
    model.transferMoney(receiverAccount, amount);
    updateUI(model.state.currentAccount);
  }
};

const controlDeleteAccount = function () {
  const { user, pin } = view.getCloseAccountData();
  if (
    user === model.state.currentAccount.username &&
    pin === model.state.currentAccount.pin
  )
    model.deleteAccount();

  view.hideUI();
  view.renderMessage('Cuenta eliminada correctamente', 'success');
  view.showLogoPage();
};

//Logout Function
const controlLogOut = function () {
  view.logout();
};

const controlSorted = function () {
  view.displayMovements(model.state.currentAccount, !sorted);
  view.rowsStyle();
  sorted = !sorted;
};

const controlSignUp = function () {
  view.showSignUpForm();
};

const init = function () {
  view.addHandlerCreateAccount(controlCreateAccount);
  view.addHandlerLogin(controlLogin);
  view.addHandlerLoan(controlLoan);
  view.addHandlerTransfer(controlTransfer);
  view.addHandlerDeleteAccount(controlDeleteAccount);
  view.addHandlerLogout(controlLogOut);
  view.addHandlerSort(controlSorted);
  view.addHandlerSignUp(controlSignUp);
};
init();
