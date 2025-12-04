const {
  createUsernames,
  calcDisplayBalance,
  transferMoney,
} = require('../bankLogic');

// CREATE USERNAME
test('create username of name with separation', () => {
  const result = createUsernames('Muriel Garcia');

  expect(result).toBe('mg');
});

test('create username of name with all capital letters', () => {
  const result = createUsernames('MURIEL GARCIA');

  expect(result).toBe('mg');
});

test('create username of name with more than one separation', () => {
  const result = createUsernames('Muriel  Garcia');

  expect(result).toBe('mg');
});

test('create username without last name', () => {
  const result = createUsernames('Muriel');

  expect(result).toBe('m');
});

test('create username of empty string', () => {
  const result = createUsernames(' ');

  expect(result).toBe('');
});

test('create username with leading and trailing spaces', () => {
  const result = createUsernames(' Muriel Garcia ');

  expect(result).toBe('mg');
});

test('create username with two last names', () => {
  const result = createUsernames('Muriel Garcia García');

  expect(result).toBe('mgg');
});

//CALCULATE BALANCE

describe('Tests for calcDisplayBalance', () => {
  test('mixed movements', () => {
    const result = calcDisplayBalance([5, 5, 10, -10]);

    expect(result).toBe(10);
  });

  test('negative movements', () => {
    const result = calcDisplayBalance([-5, -5, -10, -10]);

    expect(result).toBe(-30);
  });

  test('single value', () => {
    const result = calcDisplayBalance([5]);

    expect(result).toBe(5);
  });

  test('empty array', () => {
    const result = calcDisplayBalance([]);

    expect(result).toBe(0);
  });

  test('balance of 0', () => {
    const result = calcDisplayBalance([5, -5, 10, -10]);

    expect(result).toBe(0);
  });

  test('decimal numbers', () => {
    const result = calcDisplayBalance([5.5, 1.5, 10.3]);

    expect(result).toBe(17.3);
  });
});

//TRANSFER MONEY
describe('Tests for transfer money', () => {
  test('Standard transfer', () => {
    const account1 = {
      owner: 'X',
      balance: '100',
      movements: [50, 50],
    };
    const account2 = {
      owner: 'Y',
      balance: '200',
      movements: [150, 50],
    };
    const result = transferMoney(account1, account2, 20);

    expect(result).toBe(true);
  });

  test('The amount to be transferred is exactly equal to the senders balance', () => {
    const account1 = {
      owner: 'X',
      balance: '100',
      movements: [50, 50],
    };
    const account2 = {
      owner: 'Y',
      balance: '200',
      movements: [150, 50],
    };
    const result = transferMoney(account1, account2, 100);

    expect(result).toBe(true);
  });

  test('The amount is bigger than the balance', () => {
    const account1 = {
      owner: 'X',
      balance: '100',
      movements: [50, 50],
    };
    const account2 = {
      owner: 'Y',
      balance: '200',
      movements: [150, 50],
    };
    const result = transferMoney(account1, account2, 150);

    expect(result).toBe(false);
  });

  test('Sender === receiver', () => {
    const account1 = {
      owner: 'X',
      balance: '100',
      movements: [50, 50],
    };
    const account2 = {
      owner: 'Y',
      balance: '200',
      movements: [150, 50],
    };
    const result = transferMoney(account1, account1, 10);

    expect(result).toBe(false);
  });

  test('receiver account is null', () => {
    const account1 = {
      owner: 'X',
      balance: '100',
      movements: [50, 50],
    };
    const account2 = {
      owner: 'Y',
      balance: '200',
      movements: [150, 50],
    };
    const result = transferMoney(account1, null, 10);

    expect(result).toBe(false);
  });
});
