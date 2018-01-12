import validate from '@/utils/validate'

describe('utils/validate', () => {
  before(() => {
    validate.__Rewire__('presets', {
      somePreset: {
        type: 'string',
        minLength: 10,
      },
    })
  })

  after(() => {
    validate.__ResetDependency__('presets')
  })

  it('returns preset by name', async () => {
    expect(validate.preset('somePreset')).to.deep.equal({
      type: 'string',
      minLength: 10,
    })
  })

  it('returns extended preset', async () => {
    expect(validate.preset('somePreset', { optional: true })).to.deep.equal({
      type: 'string',
      minLength: 10,
      optional:  true,
    })
  })

  it('returns wrapped validation object', async () => {
    const validation = validate.run(
      { data: 'some longer test' },
      { data: validate.preset('somePreset') },
    )
    expect(validation).to.be.an('object')
    expect(validation).to.have.all.keys([
      'throwIfInvalid',
      'get',
      'otherwise',
      'value',
    ])
  })

  it('returns undefined and throw nothing since there is no error', async () => {
    const validation = validate.run(
      { data: 'some longer test' },
      { data: validate.preset('somePreset') },
    )
    expect(validation.get()).to.be.undefined()
    expect(validation.throwIfInvalid).to.not.throw()
  })

  it('returns error object and throw it because of an error', async () => {
    const validation = validate.run(
      { data: 's' },
      { data: validate.preset('somePreset') },
    )
    expect(validation.get()).to.be.lengthOf(1)
    expect(validation.get()[0]).to.have.any.key('message')
    expect(validation.throwIfInvalid).to.throw()
  })

  it('allows to chain methods', async () => {
    const validation = validate.run(
      { data: 'some longer test' },
      { data: validate.preset('somePreset') },
    )
    expect(validation.throwIfInvalid().get).to.not.throw()
    const doSomething = spy()
    expect(() => validation.throwIfInvalid().otherwise(doSomething)).to.not.throw()
    expect(doSomething).to.have.been.called.once()
  })
})
