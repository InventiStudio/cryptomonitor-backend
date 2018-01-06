import error from '@/lib/error'


describe('lib/error', () => {
  const handler = spy()
  before(() => {
    error.__Rewire__('handler', handler)
  })

  after(() => {
    error.__ResetDependency__('handler')
  })

  it('throws an error', () => {
    try {
      error.throw({
        name: 'errorName',
        data: { key: ['some error'] },
        message: 'Warning error!',
      })
    } catch (err) {
      expect(err.name).to.equal('errorName')
      expect(err.data).to.deep.equal({ key: ['some error'] })
      expect(err.message).to.equal('Warning error!')
    }
  })

  it('returns koa middleware that catches errors', () => {
    const middleware = error.use()
    expect(middleware).to.be.a('function')
  })

  it('calls next function from koa stack', async () => {
    const middleware = error.use()
    const nextWithoutError = spy()
    await middleware(undefined, nextWithoutError)
    expect(nextWithoutError).to.have.been.called.once()
    expect(handler).to.have.been.not.called()
  })

  it('calls next function from koa stack and catches error', async () => {
    const middleware = error.use()
    const nextWithError = spy(() => error.throw('Some error'))
    await middleware(undefined, nextWithError)
    expect(nextWithError).to.have.been.called.once()
    expect(handler).to.have.been.called.once()
  })
})
