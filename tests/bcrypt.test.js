const { hashPassword, comparePassword } = require('../helpers/bcrypt')
let hashed = hashPassword('password')

test('testing hashPassword', () => {
  expect(hashPassword('password')).toStrictEqual(expect.any(String))
})
test('testing comparePassword', () => {
  expect(comparePassword('password', hashed)).toBe(true)
})