const { createUsernames } = require('../bankLogic');

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
