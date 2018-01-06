import fs     from 'fs'
import path   from 'path'
import db     from '@/lib/db'
import logger from '@/lib/logger'
import config from '../.sequelizerc'

const log = string => logger(`Seed ${string}`, {
  icon:  'corn',
  color: 'white',
})

const fileNames = fs.readdirSync(config['seeders-path'])
  .filter(file => path.extname(file) === '.js')
  .sort()

db
  .sync()
  .then(async () => {
    for (const fileName of fileNames) {
      const seedFile = require(path.join(config['seeders-path'], fileName))
      log(`${fileName} : Seeding...`)
      await seedFile.seed(process.env.NODE_ENV)
    }
    db.close()
  })
