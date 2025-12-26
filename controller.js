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

const controlCreateAccount = function () {
  const { user, pin } = view.getSignUpData();

  if (!user || !pin) {
    view.renderMessage(
      'Rellena ambos campos para crear un usuario',
      'error',
      false
    );

    return;
  }
  const isCreated = model.createAccount(user, pin);
  if (!isCreated) {
    view.renderMessage(
      'Parece que ya tienes una cuenta con nosotros, prueba a iniciar sesión',
      'error'
    );
    view.showSignUpForm();
  } else {
    view.renderMessage('Cuenta creada con éxito', 'success');
    view.showLogoPage();
  }
};

const updateUI = function (acc) {
  //Display movements
  view.displayMovements(acc);
  //Display Balance
  view.calcDisplayBalance(acc);
  //Display Sumary
  view.calcDisplaySummary(acc);
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
