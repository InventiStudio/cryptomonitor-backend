import handler from '@/errors'

export default {

  render(ctx, code, data) {
    return ctx.throw(code, { data })
  },

  throw({ name, data, message }) {
    const err = new Error(message)
    err.name = name
    err.data = data
    throw err
  },

  use() {
    return async function middleware(ctx, next) {
      try {
        await next()
      } catch (err) {
        handler(ctx, err)
      }
    }
  },

}
