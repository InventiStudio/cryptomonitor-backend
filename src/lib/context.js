export default () =>
  async (ctx, next) => {
    ctx.render = (data, meta) => {
      ctx.body = {
        status: 'success',
        data:   data || null,
        meta:   Object.assign(
          {},
          Array.isArray(data)
            ? { count: (data || {}).length }
            : {},
          meta,
        ),
      }
      ctx.setStatus(ctx.request.method === 'POST' ? 201 : 200)
      return ctx
    }

    ctx.setStatus = (status = 200) => {
      ctx.response.status = status
      return ctx
    }

    ctx.setHeader = (field, value) => {
      ctx.response.set(field, value)
      return ctx
    }

    ctx.then = then => then()

    await next()
  }
