import 'babel-polyfill'
import prepare from 'mocha-prepare'
import supertest from 'supertest'
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import chaiAsPromised from 'chai-as-promised'
import '@/models/relations'
import chaiSpies from 'chai-spies'
import config from '@/lib/config'
import server from '@/lib/server'
import db from '@/lib/db'
import { clean } from '../tasks/db-clean'

prepare((done) => {
  // called before loading of test cases
  chai.use(dirtyChai)
  chai.use(chaiAsPromised)
  chai.use(chaiSpies)
  db.sync().then(() => {
    global.server = server.listen(config.app.port)
    global.expect = chai.expect
    global.spy = chai.spy
    global.supertest = supertest
    global.clean = clean
    done()
  })
}, (done) => {
  // called after all test completes (regardless of errors)
  done()
})
