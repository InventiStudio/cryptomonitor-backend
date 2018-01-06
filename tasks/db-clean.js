import db from '@/lib/db'
import logger from '@/lib/logger'
import Session from '@/models/session'
import User from '@/models/user'
import Content from '@/models/content'
import Language from '@/models/language'

const sequence = [
  Content,
  Language,
  Session,
  User,
]

const log = string => logger(`Clean ${string}`, {
  icon:  'bathtub',
  color: 'white',
})

async function clean(withLog = false) {
  await db.query('DELETE FROM "SequelizeMeta"')
  if (withLog) log('SequelizeMeta')
  for (const model of sequence) {
    await model.destroy({ where: {} })
    if (withLog) log(model.name)
  }
}

function cli() {
  db
    .sync()
    .then(async () => {
      await clean(true)
      db.close()
    })
}

export { cli, clean }
