import db from '@/lib/db'
import logger from '@/lib/logger'
import Session from '@/modules/session/session.model'
import User from '@/modules/user/user.model'
import Content from '@/modules/content/content.model'
import Language from '@/modules/language/language.model'

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
