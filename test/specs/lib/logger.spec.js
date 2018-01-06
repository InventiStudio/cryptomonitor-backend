import logger from '@/lib/logger'

describe('lib/logger', () => {
  function loggerWrapper(...params) {
    let logBuffer
    const consoleLogTemp = console.log // eslint-disable-line no-console
    console.log = function log(...args) { logBuffer = args.join(' ') } // eslint-disable-line no-console
    logger(...params)
    console.log = consoleLogTemp // eslint-disable-line no-console
    return logBuffer
  }

  before(() => {
    logger.__Rewire__('moment', () => ({
      format() { return 'DATE' },
    }))
  })

  after(() => {
    logger.__ResetDependency__('moment')
  })

  it('renders text', () => {
    expect(loggerWrapper(
      'Some text',
      {
        icon: 'joy',
        style: 'bold',
      },
    )).to.match(/^\S*\[DATE\]\S* 😂 {2}\S*Some text\S*$/)
  })
})
