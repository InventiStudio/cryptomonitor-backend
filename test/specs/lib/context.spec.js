import context from '@/lib/context'

describe('lib/context', () => {
  let middleware
  let ctx
  let next
  beforeEach(() => {
    middleware = context()
    ctx = {
      request: { method: 'GET' },
      response: {},
    }
    next = () => {}
  })

  it('adds proper methods to ctx', () => {
    middleware(ctx, next)
    expect(ctx).to.include.all.keys(
      'render',
      'setStatus',
      'setHeader',
      'then',
    )
  })

  it('renders and sets success response', () => {
    middleware(ctx, next)

    ctx.render({ a: 1, b: 2 })
    expect(ctx).to.have.property('body')
    expect(ctx.body).to.deep.equal({
      status: 'success',
      meta: {},
      data: {
        a: 1,
        b: 2,
      },
    })
    expect(ctx.response.status).to.eq(200)

    ctx.request.method = 'POST'
    ctx.render([{ a: 1, b: 2 }])
    expect(ctx).to.have.property('body')
    expect(ctx.body).to.deep.equal({
      status: 'success',
      meta: { count: 1 },
      data: [{
        a: 1,
        b: 2,
      }],
    })
    expect(ctx.response.status).to.eq(201)
  })
})
