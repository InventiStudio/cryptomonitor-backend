import scheduler from '@/lib/scheduler'

describe('lib/scheduler', () => {
  let later

  beforeEach(() => {
    scheduler.tasks.length = 0
    later = {
      setInterval: spy(() => ({
        clear: spy(),
      })),
      parse: { text: spy(v => v) },
    }
    scheduler.__Rewire__('later', later)
  })

  it('has empty tasks list at the beginning', async () => {
    expect(scheduler.tasks).to.be.empty()
  })

  it('schedules tasks', async () => {
    scheduler.schedule('name', () => {}, 'never')
    expect(scheduler.tasks).to.have.length(1)
    scheduler.schedule('name', () => {}, 'never')
    expect(scheduler.tasks).to.have.length(2)
    expect(later.parse.text).to.have.been.called.always.with.exactly('never')
  })

  it('schedules task with specified properties', async () => {
    const task = scheduler.schedule('name', () => {}, 'never')
    expect(task.name).to.be.equal('name')
    expect(task.job).to.be.a('function')
    expect(task.handler).to.be.undefined()
    expect(task.interval).to.be.not.undefined()
    expect(task.isScheduled).to.be.false()
    expect(task.setInterval).to.be.a('function')
    expect(task.run).to.be.a('function')
    expect(task.stop).to.be.a('function')
  })

  it('sets inverval of scheduled task', async () => {
    const task = scheduler.schedule('name', () => {}, 'never')
    expect(task.interval).to.be.equal('never')
    task.setInterval('sometimes')
    expect(task.interval).to.be.equal('sometimes')
  })

  it('runs and stops scheduled task', async () => {
    const task = scheduler.schedule('name', () => {}, 'never')
    task.run()
    expect(task.handler).to.not.be.undefined()
    task.run()
    expect(later.setInterval).to.have.been.called.once()
    expect(task.isScheduled).to.be.true()
    task.stop()
    expect(task.isScheduled).to.be.false()
    task.stop()
    expect(task.handler.clear).to.have.been.called.once()
  })

  it('updates task by name', async () => {
    const task = scheduler.schedule('name', () => {}, 'never')
    expect(task.handler).to.be.undefined()
    expect(later.setInterval).to.have.been.not.called()

    scheduler.update({ name: 'name', schedule: false })
    expect(task.handler).to.be.undefined()
    expect(task.isScheduled).to.be.false()
    expect(later.setInterval).to.have.been.not.called()

    scheduler.update({ name: 'name', schedule: true })
    expect(later.setInterval).to.have.been.called.once()
    expect(task.isScheduled).to.be.true()
    expect(task.handler).to.not.be.undefined()

    scheduler.update({ name: 'name', schedule: false })
    expect(task.isScheduled).to.be.false()

    scheduler.update({ name: 'name', interval: 'sometimes' })
    expect(later.setInterval).to.have.been.called.once()
    expect(task.interval).to.be.equal('sometimes')
    expect(task.isScheduled).to.be.false()

    scheduler.update({ name: 'name', interval: 'always', schedule: true })
    expect(later.setInterval).to.have.been.called.twice()
    expect(task.interval).to.be.equal('always')
    expect(task.isScheduled).to.be.true()

    scheduler.update({ name: 'name', interval: 'often' })
    expect(later.setInterval).to.have.been.called.exactly(3)
    expect(task.interval).to.be.equal('often')
    expect(task.isScheduled).to.be.true()
  })
})
