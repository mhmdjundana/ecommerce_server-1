const request = require('supertest')
const app = require('../app')
const { User } = require('../models/')
const { sequelize } = require('../models/')
const { queryInterface } = sequelize 

beforeAll ((done) => {
  // queryInterface.bulkInsert('Users', [{email: 'jundana@mail.com', password: '123123'}])
  // .then(() => {
  //   done()
  // })
  // .catch(err => {
  //   done()
  // })
  // console.log('MASUK BEFORE all USER')
  User.create({
    email: 'jundana@mail.com', password: '123123'
  })
    .then(data => {
      // console.log(data,'data beforeALL +++++')
      done()
    })
    .catch(err => {
      // console.log('err beforeALL +++++', err)
      done()
    })
})

// afterAll ((done) => {
//   // console.log('MASUK AFTER all USER')
//   User.destroy({ where: { email: 'jundana@mail.com' }})
//   .then(data => {
//     // console.log('data afterALL +++++', data)
//     done()
//   })
//   .catch(err => {
//     // console.log('err afterALL +++++', err)
//     done()
//   })
// })

// lifecycle
// afterall dijalankan tiap kali test selesai (per file)
afterAll ((done) => {
  queryInterface.bulkDelete('Users')
  .then(() => {
    done()
  })
  .catch(err => {
    // console.log('err afterALL +++++', err)
    done()
  })
})

describe('Test endpoint POST /login', () => {
  it('test login success', (done) => {
    // console.log('MASUK test login success')
    request(app)
    .post('/login')
    .send({email: 'jundana@mail.com', password: '123123'})
    .then(response => {
      let { body, status } = response
      expect(status).toEqual(200)
      // expect(body).toHaveProperty('id', expect.any(Number))
      // expect(body).toHaveProperty('email', 'jundana@mail.com')
      expect(body).toHaveProperty('access_token', expect.any(String))
      done()
    })
    .catch(err => {
      console.log('err test login success ++++', err)
      done()
    }) 
  })
  it('test login email not found', (done) => {
    request(app)
    .post('/login')
    .send({ email: 'notfound@mail.com', password: '123123'})
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(500)
      expect(body).toHaveProperty('msg', 'invalid email/password')
      done()
    })
    .catch(err => {
      console.log('err test login email not found+++', err)
      done()
    }) 
  })
  it('test login invalid password', (done) => {
    request(app)
    .post('/login')
    .send({ email: 'jundana@mail.com', password: 'invalidpassword'})
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(500)
      expect(body).toHaveProperty('msg', 'invalid email/password')
      done()
    })
    .catch(err => {
      console.log('err test login invalid password ++++',err)
      done()
    }) 
  })
  it('test login invalid email & password', (done) => {
    request(app)
    .post('/login')
    .send({ email: 'notfound@mail.com', password: 'invalidpassword'})
    .then(response => {
      const { body, status } = response
      expect(status).toEqual(500)
      expect(body).toHaveProperty('msg', 'invalid email/password')
      done()
    })
    .catch(err => {
      console.log('err test login invalid email & password', err)
      done()
    }) 
  })
})