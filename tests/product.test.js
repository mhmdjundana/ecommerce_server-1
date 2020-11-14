const request = require('supertest')
const app = require('../app')
const { Product, User } = require('../models/')
const { signToken, verifyToken } = require('../helpers/jwt')

let access_token = ''

beforeAll (() => {
  console.log('=== MASUK BEFOREALL PRODUCT ===')
  User.create({
    email: 'jundana@mail.com', password: '123123'
  })
    .then(data => {
      console.log(data,'data beforeALL +++++')
    })
    .catch(err => {
      console.log('err beforeALL +++++', err)
    })
  // access_token = signToken({id: 1, email: 'jundana@mail.com'})
})
afterAll (() => {
  console.log('MASUK AFTER all USER')
  User.destroy({ where: { email: 'jundana@mail.com' }})
  .then(data => {
    console.log('data afterALL +++++', data)
  })
  .catch(err => {
    console.log('err afterALL +++++', err)
  })
})
console.log('******************** asdasdas ***************************')

describe('Test endpoint POST /products/add', () => {
  it('test add product success', () => {
    request(app)
      .post('/products/add')
      .set('access_token', access_token)
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: 100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', 'kemeja')
        expect(body).toHaveProperty('image_url', 'http://img.com')
        expect(body).toHaveProperty('price', 100000)
        expect(body).toHaveProperty('stock', 50)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('createdAt', expect.any(Date))
        expect(body).toHaveProperty('updatedAt', expect.any(Date))
      })
      .catch(err => console.log(err))
  })
  it('test add product without acces_token', () => {
    request(app)
      .post('/products/add')
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: 100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
      })
      .catch(err => console.log(err))
  })
  it('test add product without administrator\'s acces_token', () => {
    request(app)
      .post('/products/add')
      .set({
        access_token: 'not.admin'
      })
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: 100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
      })
      .catch(err => console.log(err))
  })
  it('test add product required field without value', () => {
    request(app)
      .post('/products/add')
      .set({
        access_token
      })
      .send({
        name: '',
        image_url: 'http://img.com',
        price: 100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Name is required!')
      })
      .catch(err => console.log(err))
  })
  it('test add product: stock has negative value', () => {
    request(app)
      .post('/products/add')
      .set({
        access_token
      })
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: 100000,
        stock: -50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Stock value must equal or greater than 0!')
      })
      .catch(err => console.log(err))
  })
  it('test add product: price has negative value', () => {
    request(app)
      .post('/products/add')
      .set({
        access_token
      })
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: -100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price value must equal or greater than 0!')
      })
      .catch(err => console.log(err))
  })
  it('test add product: field diisi tipe data yg tak sesuai', () => {
    request(app)
      .post('/products/add')
      .set({
        access_token
      })
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: '100000',
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price value must be a number!')
      })
      .catch(err => console.log(err))
  })
})

describe('Test endpoint POST /products/update:id', () => {
  it('test update product: success', () => {
    request(app)
      .post('/products/update:id')
      .set('access_token', access_token)
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: 150000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', 'kemeja putih')
        expect(body).toHaveProperty('image_url', 'http://img.com/image.jpg')
        expect(body).toHaveProperty('price', 150000)
        expect(body).toHaveProperty('stock', 100)
      })
      .catch(err => console.log(err))
  })
  it('test update product: without acces_token', () => {
    request(app)
      .post('/products/update:id')
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: 150000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
      })
      .catch(err => console.log(err))
  })
  it('test update product: without administrator\'s acces_token', () => {
    request(app)
      .post('/products/update:id')
      .set({
        access_token: 'not.admin'
      })
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: 150000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
      })
      .catch(err => console.log(err))
  })
  it('test update product: stock has negative value', () => {
    request(app)
      .post('/products/update:id')
      .set({
        access_token
      })
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: 150000,
        stock: -100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Stock value must equal or greater than 0!')
      })
      .catch(err => console.log(err))
  })
  it('test update product: price has negative value', () => {
    request(app)
      .post('/products/update:id')
      .set({
        access_token
      })
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: -150000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price value must equal or greater than 0!')
      })
      .catch(err => console.log(err))
  })
  it('test update product: field diisi tipe data yg tak sesuai', () => {
    request(app)
      .post('/products/update:id')
      .set({
        access_token
      })
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: '150000',
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price value must be a number!')
      })
      .catch(err => console.log(err))
  })
})

describe('Test endpoint POST /products/delete/:id', () => {
  it('test delete product: success', () => {
    request(app)
      .post('/products/delete:id')
      .set('access_token', access_token)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('msg', 'Delete product success')
      })
      .catch(err => console.log(err))
  })
  it('test delete product: without acces_token', () => {
    request(app)
      .post('/products/delete:id')
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
      })
      .catch(err => console.log(err))
  })
  it('test delete product: without administrator\'s acces_token', () => {
    request(app)
      .post('/products/delete:id')
      .set({
        access_token: 'not.admin'
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
      })
      .catch(err => console.log(err))
  })
})