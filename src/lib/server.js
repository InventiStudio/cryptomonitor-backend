import path          from 'path'
import Koa           from 'koa'
import bodyParser    from 'koa-bodyparser'
import compress      from 'koa-compress'
import time          from 'koa-response-time'
import koalogger     from 'koa-request-logger'
import errorFormater from 'koa-json-error'
import koaqs         from 'koa-qs'
import serve         from 'koa-static'
import mount         from 'koa-mount'
import cors          from 'kcors'
import context       from '@/lib/context'
import error         from '@/lib/error'
import logger        from '@/lib/logger'
import config        from '@/lib/config'
import router        from './router'

const app = new Koa()

function formatError(err) {
  return {
    status:  'error',
    code:    err.status,
    message: err.message,
    data:    err.data,
  }
}

function koaloggerConfig() {
  function loggerMethod(string) {
    return config.switches.koa_logger
      ? logger(string, {
        icon: 'left_right_arrow',
        color: 'blue',
      })
      : false
  }
  return {
    logger: { loggerMethod },
    method: 'loggerMethod',
    format: (ctx, id, isIn = true, timeDiff = null) => (isIn ?
      `-> ${ctx.request.method} ${ctx.request.url}` :
      `<- ${ctx.request.method} ${ctx.request.url} ${ctx.status} ${timeDiff}ms`
    ),
  }
}

const staticServer = new Koa().use(serve(path.join(process.env.PWD, 'assets')))

koaqs(app, 'extended')

app.on('error', err => console.error(err)) // eslint-disable-line no-console

app
  .use(koalogger(koaloggerConfig()))
  .use(errorFormater(formatError))
  .use(error.use())
  .use(cors({ origin: config.app.origin }))
  .use(time())
  .use(bodyParser({ jsonLimit: '10mb' }))
  .use(compress())
  .use(context())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(mount('/assets', staticServer))

export default app
