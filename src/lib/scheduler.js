import later  from 'later'
import logger from '@/lib/logger'
import config from '@/lib/config'

const tasks = []

const log = (str) => {
  if (config.switches.scheduler_logger) {
    logger(str, {
      icon: 'alarm_clock',
      color: 'yellow',
      style: 'bold',
    })
  }
}

function Task({ name, job, timer }) {
  const wrapper = {
    name,
    job,
    interval:    undefined,
    handler:     undefined,
    isScheduled: false,
    setInterval(newTimer) {
      log(`"${name}" task's interval has been updated...`)
      wrapper.interval = later.parse.text(newTimer)
      return wrapper
    },
    run() {
      if (!wrapper.isScheduled) {
        log(`"${name}" task has been scheduled...`)
        wrapper.handler = later.setInterval(job, wrapper.interval)
        wrapper.isScheduled = true
      }
      return wrapper
    },
    stop() {
      if (wrapper.isScheduled) {
        log(`"${name}" task has been stopped...`)
        wrapper.isScheduled = false
        wrapper.handler.clear()
      }
      return wrapper
    },
  }
  wrapper.setInterval(timer)
  return wrapper
}

export default {
  tasks,
  schedule(name, func, timer) {
    function job() {
      log(`"${name}" task. Running...`)
      func(str => log(`"${name}" task. ${str}`))
    }
    const task = Task({ name, job, timer })
    tasks.push(task)
    return task
  },
  start(conditions) {
    if (config.switches.scheduler) {
      tasks.forEach((task) => {
        if (conditions[task.name]) task.run()
      })
    } else {
      log(`Scheduler has been turned off in ${config.env} mode`)
    }
  },
  update({ name, schedule, interval }) {
    const task = tasks.find(t => t.name === name)
    const wasScheduledBeforeUpdate = task.isScheduled
    if (!task) throw new Error(`There is no task named ${name}.`)
    if (task.isScheduled) task.stop()
    if (interval) task.setInterval(interval)
    if  ((schedule !== undefined && schedule)
      || (schedule === undefined && wasScheduledBeforeUpdate)
    ) task.run()
  },
}
