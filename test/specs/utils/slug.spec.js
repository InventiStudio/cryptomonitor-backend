import genSlug from '@/utils/slug'

describe('utils/slug', () => {
  it('generates slug based on given title, using default config', () => {
    const slug = genSlug('Some pretty title.')
    expect(slug).to.eq('some-pretty-title')
  })

  it('generates slug based on given title, using given config', () => {
    const config = { replacement: '_' }
    const slug = genSlug('Some other, PRETTY, title.', config)
    expect(slug).to.eq('some_other_pretty_title')
  })
})
