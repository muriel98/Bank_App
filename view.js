class View {
  labelWelcome = document.querySelector('.welcome');
  labelDate = document.querySelector('.date');
  labelBalance = document.querySelector('.balance__value');
  labelSumIn = document.querySelector('.summary__value--in');
  labelSumOut = document.querySelector('.summary__value--out');
  labelSumInterest = document.querySelector('.summary__value--interest');
  labelTimer = document.querySelector('.timer');
  titleLogo = document.querySelector('.logo_title');
  createAccountText = document.querySelector('.create-account-text');

  containerApp = document.querySelector('.app');
  containerMovements = document.querySelector('.movements');
  signUpForm = document.querySelector('.sign-up-form');
  containerFirstPage = document.querySelector('.first-page');
  containerMessage = document.querySelector('.message');
  formContainer = document.querySelector('.sign-up');

  btnLogin = document.querySelector('.login__btn');
  btnCreateAccount = document.querySelector('.create-account');
  btnTransfer = document.querySelector('.form__btn--transfer');
  btnLoan = document.querySelector('.form__btn--loan');
  btnClose = document.querySelector('.form__btn--close');
  btnSort = document.querySelector('.btn--sort');
  btnLogOut = document.querySelector('.logout__btn');
  btnSignUp = document.querySelector('.sign-up-link');

  inputSignUpUserName = document.querySelector('.sign-up-username');
  inputSignUpPin = document.querySelector('.sign-up-pin');
  inputLoginUsername = document.querySelector('.login__input--user');
  inputLoginPin = document.querySelector('.login__input--pin');
  inputTransferTo = document.querySelector('.form__input--to');
  inputTransferAmount = document.querySelector('.form__input--amount');
  inputLoanAmount = document.querySelector('.form__input--loan-amount');
  inputCloseUsername = document.querySelector('.form__input--user');
  inputClosePin = document.querySelector('.form__input--pin');

  formatMovementDate(dateLabel, local) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), dateLabel);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago `;

    return new Intl.DateTimeFormat(local).format(dateLabel);
  }

  formatCurrencies(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  }

  updateTimer(time) {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    this.labelTimer.textContent = `${min} : ${sec} `;
  }

  animateLogin() {
    //Logo Animation with GSAP
    gsap.to('.logo', {
      duration: 1.2,
      scale: 0.55,
      yPercent: -120,
      transformOrigin: 'top center',
      ease: 'power3.out',
    });
    this.containerFirstPage.classList.remove('fade_in');
    this.containerFirstPage.classList.add('fade_out');
    this.createAccountText.classList.add('fade_out');
    //Display logout button
    this.btnLogOut.classList.add('fade_in');
    this.btnLogin.classList.add('fade_out');
  }

  displayHeaderDate(acc) {
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
    this.labelDate.textContent = new Intl.DateTimeFormat(
      acc.locale,
      options
    ).format(now);
  }

  showApp(acc) {
    //Display UI and message
    this.labelWelcome.textContent = `Bienvenido/a, ${acc.owner.split(' ')[0]} `;
    this.containerApp.style.opacity = 100;

    //Clear user and pin fields
    this.inputLoginUsername.value = '';
    this.inputLoginPin.value = '';

    //make pin lose the focus
    this.inputLoginPin.blur();
  }

  rowsStyle() {
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

  logout() {
    this.containerApp.style.opacity = 0;
    this.labelWelcome.textContent = '';
    this.showLogoPage();
    this.btnLogOut.classList.remove('fade_in');
    gsap.to('.logo', {
      duration: 1,
      scale: 1,
      yPercent: 0,
      ease: 'power3.inOut',
    });
  }

  getLoginData() {
    return {
      user: this.inputLoginUsername.value,
      pin: +this.inputLoginPin.value,
    };
  }

  getSignUpData() {
    return {
      user: this.inputSignUpUserName.value,
      pin: +this.inputSignUpPin.value,
    };
  }

  getLoanAmount() {
    const amount = Math.floor(Number(this.inputLoanAmount.value));
    this.inputLoanAmount.value = '';
    this.inputLoanAmount.blur();

    return amount;
  }

  getTransferData() {
    const data = {
      to: this.inputTransferTo.value,
      amount: Number(this.inputTransferAmount.value),
    };
    this.inputTransferTo.value = this.inputTransferAmount.value = '';
    this.inputTransferAmount.blur();
    return data;
  }

  getCloseAccountData() {
    const user = this.inputCloseUsername.value;
    const pin = +this.inputClosePin.value;
    this.inputCloseUsername.value = this.inputClosePin.value = '';

    return { user, pin };
  }

  hideUI = function () {
    this.containerApp.style.opacity = 0;
  };

  //Updates movements in the interface
  displayMovements(acc, sort = false) {
    this.containerMovements.innerHTML = '';

    const combinedMovsDates = acc.movements.map((mov, i) => ({
      movements: mov,
      date2: acc.movementsDates.at(i),
    }));

    if (sort) combinedMovsDates.sort((a, b) => a.movements - b.movements);

    combinedMovsDates.forEach((obj, i) => {
      const { movements, date2 } = obj;

      const type = movements > 0 ? 'deposit' : 'withdrawal';

      const date = new Date(acc.movementsDates[i]);
      const movDate = this.formatMovementDate(date, acc.locale);

      const formatedMov = this.formatCurrencies(
        obj.movements,
        acc.locale,
        acc.currency
      );

      const html = `<div class="movements__row">
       <div class="movements__type      movements__type--${type}">
      ${i + 1}
       ${type} </div>
        <div class="movements__date">${movDate} </div>
      <div class="movements__value">${formatedMov}
      </div>
      </div>`;

      this.containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  }

  //Calculates and displays the balance
  calcDisplayBalance(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    this.labelBalance.textContent = `${this.formatCurrencies(
      acc.balance,
      acc.locale,
      acc.currency
    )}`;
  }

  //Calculates and displays the summary
  calcDisplaySummary(account) {
    const inMoney = account.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    this.labelSumIn.textContent = `${this.formatCurrencies(
      inMoney,
      account.locale,
      account.currency
    )}`;
  }

  renderMessage(message, type = 'succes', hideForm = true) {
    //Hide Form
    if (hideForm) {
      this.signUpForm.classList.add('fade_out');
      this.createAccountText.classList.add('fade_out');

      setTimeout(() => {
        this.signUpForm.classList.add('hidden');
      }, 200);
    }

    //Show message
    this.containerMessage.textContent = message;
    this.containerMessage.classList.add(`message--${type}`);
    this.containerMessage.classList.add('fade_in');

    setTimeout(() => {
      this.containerMessage.classList.add('hidden');
    }, 1800);
  }

  showLogoPage() {
    setTimeout(() => {
      this.createAccountText.classList.remove('fade_out');
      //Go to initial page
      this.containerFirstPage.classList.remove('hidden');
      this.containerFirstPage.classList.add('fade_in');
    }, 1800);
  }

  showSignUpForm() {
    this.signUpForm.classList.remove('hidden', 'fade_out');
    this.signUpForm.classList.add('fade_in');
    this.containerFirstPage.classList.add('fade_out');
    gsap.to('.sign-up', {
      duration: 0.6,
      yPercent: -70,
      ease: 'power1.inOut',
    });
  }

  // **************** HANDLERS *****************
  addHandlerCreateAccount(handler) {
    this.btnCreateAccount.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerLogin(handler) {
    this.btnLogin.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerLoan(handler) {
    this.btnLoan.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerTransfer(handler) {
    this.btnTransfer.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerDeleteAccount(handler) {
    this.btnClose.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerLogout(handler) {
    this.btnLogOut.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerSort(handler) {
    this.btnSort.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerSignUp(handler) {
    this.btnSignUp.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new View();
