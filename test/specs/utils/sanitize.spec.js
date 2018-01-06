import sanitize from '@/utils/sanitize'

describe('utils/sanitize', () => {
  it('sanitizes given object properties based on schema', () => {
    const body = { email: ' JoHn.DOE@Mail.com', name: ' JohN  ' }
    const schema = {
      email: { type: 'string', rules: ['trim', 'lower'] },
      name: { type: 'string', rules: ['trim', 'title'] },
    }
    sanitize.run(body, schema)
    expect(body.email).to.eq('john.doe@mail.com')
    expect(body.name).to.eq('John')
  })
})
