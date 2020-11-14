const { signToken, verifyToken } = require('../helpers/jwt')
const payload = {
  id: 1,
  email: 'admin@mail.com'
}
let token = signToken(payload)

test('testing signToken', () => {
  expect(signToken(payload)).toStrictEqual(expect.any(String))
})
test('testing verifyToken', () => {
  expect(verifyToken(token)).toHaveProperty('id', 1)
  expect(verifyToken(token)).toHaveProperty('email', 'admin@mail.com')
})