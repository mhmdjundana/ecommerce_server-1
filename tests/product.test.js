const request = require('supertest')
const app = require('../app')
const { Product, User } = require('../models/')
const { signToken, verifyToken } = require('../helpers/jwt')
const { sequelize } = require('../models/')
const { queryInterface } = sequelize 

let access_token = ''
let access_token_customer = ''
let productId = null

beforeAll ((done) => {
  // console.log('=== MASUK BEFOREALL PRODUCT ===')
  queryInterface.bulkInsert('Users', [
    {email: 'jundana@mail.com', password: '123123', role: 'admin', createdAt: new Date(), updatedAt: new Date()},
    {email: 'atian@mail.com', password: '123123', role: 'customer', createdAt: new Date(), updatedAt: new Date()}
  ])
    // .then(data => {
    //   // console.log(data,'data beforeALL +++++')
    //   return User.findOne({ where: { email: 'jundana@mail.com' }})
    //   // done()
    // })
  User.findOne({ where: { email: 'jundana@mail.com' }})
    // .catch(err => {
    //   console.log('err beforeALL +++++', err)
    //   done()
    // })
    .then(data => {
      access_token = signToken({ id: data.id, email: data.email })
      return User.findOne({ where: { email: 'atian@mail.com' }})
      // done()
    })
    .then(data => {
      access_token_customer = signToken({ id: data.id, email: data.email })
      done()
    })
    .catch(err => {
      done()
    })
})
afterAll ((done) => {
  // console.log('MASUK AFTER all USER')
  // User.destroy({ where: { email: 'jundana@mail.com' }})
  // .then(data => {
  //   // console.log('data afterALL +++++', data)
  //   done()
  // })
  // .catch(err => {
  //   console.log('err afterALL +++++', err)
  //   done()
  // })
  queryInterface.bulkDelete('Products')
    .then(data => {
      return queryInterface.bulkDelete('Users')
    })
    .then(data => {
      done()
    })
    .catch(err => {
      console.log('err afterALL +++++', err)
      done()
    })
})
// console.log('******************** asdasdas ***************************')

describe('Test endpoint POST /add', () => {
  it('test add product success', (done) => {
    // console.log('==================access_token======================')
    // console.log(access_token, 'asdasd')
    request(app)
      .post('/add')
      .set('access_token', access_token)
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: 100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        productId = body.id
        expect(status).toEqual(201)
        expect(body).toHaveProperty('name', 'kemeja')
        expect(body).toHaveProperty('image_url', 'http://img.com')
        expect(body).toHaveProperty('price', 100000)
        expect(body).toHaveProperty('stock', 50)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('createdAt', expect.any(String))
        expect(body).toHaveProperty('updatedAt', expect.any(String))
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test add product without acces_token', (done) => {
    request(app)
      .post('/add')
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: 100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test add product without administrator\'s acces_token', (done) => {
    request(app)
      .post('/add')
      .set('access_token', access_token_customer)
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: 100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', 'Not authorized')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test add product required field without value', (done) => {
    request(app)
      .post('/add')
      .set({
        access_token
      })
      .send({
        name: null,
        image_url: 'http://img.com',
        price: 100000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg', 'Name is required!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test add product: stock has negative value', (done) => {
    request(app)
      .post('/add')
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
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg', 'Stock must equal or greater than 0')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test add product: price has negative value', (done) => {
    request(app)
      .post('/add')
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
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg', 'Price must equal or greater than 0')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test add product: field diisi tipe data yg tak sesuai', (done) => {
    request(app)
      .post('/add')
      .set({
        access_token
      })
      .send({
        name: 'kemeja',
        image_url: 'http://img.com',
        price: 'price 100000',
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg', 'Price value must be a number!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})

describe('Test endpoint POST /update/:id', () => {
  it('test update product: without acces_token', (done) => {
    request(app)
      .put(`/update/${productId}`)
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: 150000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test update product: without administrator\'s acces_token', (done) => {
    request(app)
      .put(`/update/${productId}`)
      .set({
        access_token: access_token_customer
      })
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: 150000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', 'Not authorized')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test update product: stock has negative value', (done) => {
    request(app)
      .put(`/update/${productId}`)
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
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg', 'Stock must equal or greater than 0')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test update product: price has negative value', (done) => {
    request(app)
      .put(`/update/${productId}`)
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
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg', 'Price must equal or greater than 0')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test update product: field diisi tipe data yg tak sesuai', (done) => {
    request(app)
      .put(`/update/${productId}`)
      .set({
        access_token
      })
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: 'price 150000',
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg', 'Price value must be a number!')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test update product: success', (done) => {
    // console.log('===============productId================')
    // console.log(productId, 'ajsodoqi0eiq0ei')
    request(app)
      .put(`/update/${productId}`)
      .set('access_token', access_token)
      .send({
        name: 'kemeja putih',
        image_url: 'http://img.com/image.jpg',
        price: 150000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(200)
        expect(body[1][0]).toHaveProperty('name', 'kemeja putih')
        expect(body[1][0]).toHaveProperty('image_url', 'http://img.com/image.jpg')
        expect(body[1][0]).toHaveProperty('price', 150000)
        expect(body[1][0]).toHaveProperty('stock', 100)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})

describe('Test endpoint DELETE /delete/:id', () => {
  it('test delete product: without acces_token', (done) => {
    request(app)
      .delete(`/delete/${productId}`)
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test delete product: without administrator\'s acces_token', (done) => {
    request(app)
      .delete(`/delete/${productId}`)
      .set({
        access_token: access_token_customer
      })
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(401)
        expect(body).toHaveProperty('msg', 'Not authorized')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('test delete product: success', (done) => {
    request(app)
      .delete(`/delete/${productId}`)
      .set('access_token', access_token)
      .then(response => {
        let { body, status } = response
        expect(status).toEqual(200)
        expect(body).toHaveProperty('msg', 'Delete product success')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})