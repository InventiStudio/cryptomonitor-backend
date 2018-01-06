import moment from 'moment'
import Session from '@/models/session'
import { createUser } from '#/helpers/users'
import { John } from '#/fixtures/user'

describe('controllers/session', () => {
  const USER_DATA = {
    email: 'john.doe@mail.com',
    password: 'password',
  }
  let userJohn

  beforeEach(async () => {
    await clean()
    userJohn = await createUser(John)
  })

  describe('GET', () => {
    it('returns session by token', async () => {
      const session = await Session.create({
        userId: userJohn.id,
        expiresAt: moment('2018-09-01').format(),
      })
      await supertest(server)
        .get(`/sessions/${session.id}`)
        .expect('Content-Type', /json/)
        .expect('X-Auth-Token', session.id)
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
        })
        .expect(200)
    })
  })

  describe('POST', () => {
    it('creates session', (done) => {
      supertest(server)
        .post('/sessions')
        .send(USER_DATA)
        .expect('Content-Type', /json/)
        .expect('Access-Control-Expose-Headers', 'X-Auth-Token')
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
          expect(body.data.userId).to.eq(userJohn.id)
        })
        .expect(201, done)
    })

    it('creates session with sanitized email', (done) => {
      supertest(server)
        .post('/sessions')
        .send({ ...USER_DATA, email: ' john.doe@mail.com  ' })
        .expect('Content-Type', /json/)
        .expect('Access-Control-Expose-Headers', 'X-Auth-Token')
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
          expect(body.data.userId).to.eq(userJohn.id)
        })
        .expect(201, done)
    })

    it('throws an error code 401 when user not found', async () => {
      await supertest(server)
        .post('/sessions')
        .send({ ...USER_DATA, email: 'not.found.user@mail.com' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => expect(body.status).to.eq('error'))
        .expect(401)
      await supertest(server)
        .post('/sessions')
        .send({ ...USER_DATA, email: '  John.Doe@mail.com  ' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => expect(body.status).to.eq('error'))
        .expect(401)
    })

    it('throws an error code 401 when password not matching', (done) => {
      supertest(server)
        .post('/sessions')
        .send({ ...USER_DATA, password: 'P@ssw0rd!' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => expect(body.status).to.eq('error'))
        .expect(401, done)
    })

    it('throws an error code 422 when email is invalid', (done) => {
      supertest(server)
        .post('/sessions')
        .send({ ...USER_DATA, email: 'not.a.mail' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => expect(body.status).to.eq('error'))
        .expect(422, done)
    })

    it('throws an error code 422 when password is not long enough', (done) => {
      supertest(server)
        .post('/sessions')
        .send({ ...USER_DATA, password: 'short' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => expect(body.status).to.eq('error'))
        .expect(422, done)
    })
  })

  describe('DELETE', () => {
    it('deletes session', async () => {
      const session = await Session.create({
        userId: userJohn.id,
        expiresAt: moment('2018-09-01').format(),
      })
      await supertest(server)
        .delete(`/sessions/${session.id}`)
        .set('X-Auth-Token', session.id)
        .expect('Content-Type', /json/)
        .expect(({ body }) => expect(body.status).to.eq('success'))
        .expect(200)
    })
  })
})
