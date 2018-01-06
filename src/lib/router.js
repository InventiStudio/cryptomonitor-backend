import Router from 'koa-router'

const router = new Router()

router.controller = function nest(path, prepare) {
  const controller = new Router()
  prepare(controller)
  this.use(path, controller.routes(), controller.allowedMethods())
}

if (process.env.NODE_ENV === 'development') {
  router.get('/', async (ctx, next) => {
    ctx
      .render(
        router.routes().router.stack
          .filter(path => path.methods.length)
          .reduce((arr, { path, methods }) => {
            if (arr[path]) arr[path] = arr[path].concat(methods)
            else arr[path] = methods || []
            return arr
          }, {}),
      )
      .then(await next)
  })
}

export default router
