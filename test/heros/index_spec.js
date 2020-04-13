/* global describe, beforeEach, afterEach, it, api, expect */
const Hero = require('../../models/hero')
const User = require('../../models/user')

describe('GET /heros', () => {
  beforeEach(done => {
    User.create({
      username: 'james',
      email: 'james@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        Hero.create([
          {
            name: 'anit-grav',
            power: 'Can fly but only up',
            evil: 'Good',
            irony: 8,
            image: 'https://qph.fs.quoracdn.net/main-qimg-425696cf9d76d2df24fa705265dc7911',
            user
          }, {
            name: 'Vissy man',
            power: 'Turns all his clothes invisible',
            evil: 'Good',
            irony: 6,
            image: 'https://media.istockphoto.com/photos/naked-man-walking-in-cardboard-box-picture-id184302911',
            user
          }
        ])
      })
      .then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Hero.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/heros')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/heros')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/heros')
      .end((err, res) => {
        res.body.forEach(hero => {
          expect(hero).to.be.an('object')
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', done => {
    api.get('/api/heros')
      .end((err, res) => {
        res.body.forEach(hero => {
          expect(hero).to.contains.keys([
            '_id',
            'name',
            'power',
            'evil',
            'irony',
            'image',
            'comments',
            'user',
            'likes',
            'createdAt',
            'updatedAt'
          ])
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields and types of values', done => {
    api.get('/api/heros')
      .end((err, res) => {
        res.body.forEach(hero => {
          expect(hero._id).to.be.a('string'),
          expect(hero.name).to.be.a('string'),
          expect(hero.power).to.be.a('number'),
          expect(hero.evil).to.be.a('string'),
          expect(hero.irony).to.be.a('number'),
          expect(hero.image).to.be.a('string'),
          expect(hero.comments).to.be.an('array'),
          expect(hero.likes).to.be.an('array'),
          expect(hero.user).to.be.an('object'),
          expect(hero.createdAt).to.be.a('string'),
          expect(hero.updatedAt).to.be.a('string')
        })
      })
    done()
  })
})
