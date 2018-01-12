import Language from '@/modules/language/language.model'
import Content from '@/modules/content/content.model'
import contentFixture from '@/modules/content/content.fixture'
import languageFixture from '@/modules/language/language.fixture'

async function seed(Model, data) {
  const result = Model.bulkCreate(data, {
    returning: true,
    plain:     true,
  })
  return result.map(l => JSON.parse(JSON.stringify(l)))
}

describe('controllers/language', () => {
  let contents

  beforeEach(async () => {
    await clean()
    await seed(Language, Object.values(languageFixture))
  })

  describe('GET', () => {
    beforeEach(async () => {
      contents =  await seed(Content, Object.values(contentFixture))
    })

    it('returns all contents', async () => {
      await supertest(server)
        .get('/contents')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.data).to.deep.equal(contents)
          expect(body.status).to.equal('success')
        })
        .expect(200)
    })

    it('returns content by lang and key', async () => {
      await supertest(server)
        .get('/contents/en/hello')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.data).to.deep.equal(contents[0])
          expect(body.status).to.equal('success')
        })
        .expect(200)
    })

    it('throws 404 when not found', async () => {
      await supertest(server)
        .get('/contents/xx/xx')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('error')
        })
        .expect(404)
    })
  })

  describe('POST', () => {
    it('creates content', async () => {
      await supertest(server)
        .post('/contents')
        .send(contentFixture.en_hello)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
          expect(body.data.languageSlug).to.deep.equal(contentFixture.en_hello.languageSlug)
          expect(body.data.key).to.deep.equal(contentFixture.en_hello.key)
          expect(body.data.value).to.deep.equal(contentFixture.en_hello.value)
        })
        .expect(201)
      await supertest(server)
        .get('/contents')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('success')
          expect(body.data[0].languageSlug).to.deep.equal(contentFixture.en_hello.languageSlug)
          expect(body.data[0].key).to.deep.equal(contentFixture.en_hello.key)
          expect(body.data[0].value).to.deep.equal(contentFixture.en_hello.value)
        })
        .expect(200)
    })

    it('doesn`t let to create 2 contents with same key and slug', async () => {
      await seed(Content, [contentFixture.en_hello])
      await supertest(server)
        .post('/contents')
        .send(contentFixture.en_hello)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('error')
        })
        .expect(409)
    })
  })

  describe('PATCH', () => {
    it('updates content', async () => {
      await seed(Content, [contentFixture.en_hello])
      await supertest(server)
        .patch('/contents/en/hello')
        .send({ value: 'Yo!' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
          expect(body.data.languageSlug).to.equal('en')
          expect(body.data.key).to.equal('hello')
          expect(body.data.value).to.equal('Yo!')
        })
        .expect(200)
      await supertest(server)
        .get('/contents')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('success')
          expect(body.data[0].languageSlug).to.equal('en')
          expect(body.data[0].key).to.equal('hello')
          expect(body.data[0].value).to.equal('Yo!')
        })
        .expect(200)
    })

    it('throws 404 when not found', async () => {
      await supertest(server)
        .patch('/contents/xx/fd')
        .send({ value: 'Polish' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('error')
        })
        .expect(404)
    })

    it('throws 404 when trying change to not existing language', async () => {
      await seed(Content, [contentFixture.en_hello])
      await supertest(server)
        .patch('/contents/en/hello')
        .send({ languageSlug: 'xx' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('error')
        })
        .expect(404)
    })
  })

  describe('DELETE', () => {
    it('removes content', async () => {
      await seed(Content, Object.values(contentFixture))
      await supertest(server)
        .delete('/contents/en/hello')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
        })
        .expect(200)
      await supertest(server)
        .get('/contents')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('success')
          expect(body.data).to.have.length(3)
          expect(body.data[0].languageSlug).to.deep.equal(contentFixture.pl_hello.languageSlug)
          expect(body.data[0].key).to.deep.equal(contentFixture.pl_hello.key)
          expect(body.data[0].value).to.deep.equal(contentFixture.pl_hello.value)
        })
        .expect(200)
    })

    it('throws 404 when not found', async () => {
      await supertest(server)
        .delete('/contents/xx')
        .send({ name: 'Polish' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('error')
        })
        .expect(404)
    })
  })
})
