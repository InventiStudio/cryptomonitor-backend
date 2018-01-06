import Language from '@/models/language'
import languageFixture from '#/fixtures/language'
import Content from '@/models/content'
import contentFixture from '#/fixtures/content'

async function seed(Model, data) {
  const result = Model.bulkCreate(data, {
    returning: true,
    plain:     true,
  })
  return result.map(l => JSON.parse(JSON.stringify(l)))
}

describe('controllers/language', () => {
  let languages
  let contents

  beforeEach(async () => {
    await clean()
  })

  describe('GET', () => {
    beforeEach(async () => {
      languages = await seed(Language, Object.values(languageFixture))
      contents =  await seed(Content, Object.values(contentFixture))
    })

    it('returns all languages', async () => {
      await supertest(server)
        .get('/languages')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.data).to.deep.equal(languages)
          expect(body.status).to.equal('success')
        })
        .expect(200)
    })

    it('returns language by slug', async () => {
      await supertest(server)
        .get('/languages/pl')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.data).to.deep.equal(languages[0])
          expect(body.status).to.equal('success')
        })
        .expect(200)
    })

    it('throws 404 when not found', async () => {
      await supertest(server)
        .get('/languages/xx')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('error')
        })
        .expect(404)
    })

    it('returns language`s content', async () => {
      await supertest(server)
        .get('/languages/pl/contents')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('success')
          expect(body.data).to.deep.equal(contents.filter(c => c.languageSlug === 'pl'))
        })
        .expect(200)
    })

    it('throws 404 when language is not found when looking for a content', async () => {
      await supertest(server)
        .get('/languages/xx/contents')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('error')
        })
        .expect(404)
    })
  })

  describe('POST', () => {
    it('creates language', async () => {
      await supertest(server)
        .post('/languages')
        .send(languageFixture.pl)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
          expect(body.data.slug).to.deep.equal(languageFixture.pl.slug)
          expect(body.data.name).to.deep.equal(languageFixture.pl.name)
        })
        .expect(201)
      await supertest(server)
        .get('/languages')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('success')
          expect(body.data[0].slug).to.deep.equal(languageFixture.pl.slug)
          expect(body.data[0].name).to.deep.equal(languageFixture.pl.name)
        })
        .expect(200)
    })

    it('doesn`t let to create 2 languages with same slug', async () => {
      await seed(Language, [languageFixture.pl])
      await supertest(server)
        .post('/languages')
        .send(languageFixture.pl)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('error')
        })
        .expect(409)
    })

    it('sanitizes model', async () => {
      await supertest(server)
        .post('/languages')
        .send({
          slug: '  pl   ',
          name: '   Polski',
        })
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
          expect(body.data.slug).to.deep.equal('pl')
          expect(body.data.name).to.deep.equal('Polski')
        })
        .expect(201)
    })
  })

  describe('PATCH', () => {
    it('updates language', async () => {
      await seed(Language, [languageFixture.pl])
      await supertest(server)
        .patch('/languages/pl')
        .send({ name: ' Polish  ' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
          expect(body.data.slug).to.equal('pl')
          expect(body.data.name).to.equal('Polish')
        })
        .expect(200)
      await supertest(server)
        .get('/languages')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('success')
          expect(body.data[0].slug).to.deep.equal('pl')
          expect(body.data[0].name).to.deep.equal('Polish')
        })
        .expect(200)
    })

    it('throws 404 when not found', async () => {
      await supertest(server)
        .patch('/languages/xx')
        .send({ name: 'Polish' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('error')
        })
        .expect(404)
    })
  })

  describe('DELETE', () => {
    it('removes language', async () => {
      await seed(Language, Object.values(languageFixture))
      await supertest(server)
        .delete('/languages/pl')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('success')
        })
        .expect(200)
      await supertest(server)
        .get('/languages')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.equal('success')
          expect(body.data).to.have.length(1)
          expect(body.data[0].slug).to.deep.equal(languageFixture.en.slug)
          expect(body.data[0].name).to.deep.equal(languageFixture.en.name)
        })
        .expect(200)
    })

    it('throws 404 when not found', async () => {
      await supertest(server)
        .delete('/languages/xx')
        .send({ name: 'Polish' })
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.status).to.eq('error')
        })
        .expect(404)
    })
  })
})
