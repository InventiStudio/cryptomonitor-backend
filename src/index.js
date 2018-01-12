import 'babel-polyfill' // eslint-disable-line import/no-extraneous-dependencies
import modules   from '@/lib/modules'
import scheduler from '@/scheduler'
import config    from '@/lib/config'
import server    from '@/lib/server'
import db        from '@/lib/db'
import logger    from '@/lib/logger'

modules.load()

console.error = (...errors) => logger(...errors, { // eslint-disable-line no-console
  icon: 'red_circle',
  color: 'red',
})

db.sync().then(() => {
  server.listen(config.app.port)
  scheduler()
  logger(`Server is ready on port ${config.app.port}`, {
    icon: 'rocket',
    color: 'green',
    style: 'bold',
  })
})
