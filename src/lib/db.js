import Sequelize    from 'sequelize'
import pgParseFloat from 'pg-parse-float'
import config       from '@/lib/config'
import logger       from '@/lib/logger'
import Sanitize     from '@/utils/sanitize'
import Validate     from '@/utils/validate'
import error         from '@/lib/error'

Sequelize.Promise.prototype.parseUpdate = function parse() {
  return this.then(value => value[1][0] || null)
}

Sequelize.Promise.prototype.parseDestroy = function parse() {
  return this.then(value => (value === 0 ? null : value))
}

Sequelize.Promise.prototype.throwIfNotFound = function throwIfNotFound(name = 'NotFoundError') {
  return this.then((value) => {
    const isArray = Array.isArray(value)
    if ((isArray && value.length === 0) || (!isArray && value === null)) {
      error.throw({ name })
    } else {
      return value
    }
  })
}

function createLogger(str) {
  return logger(str, {
    icon:  'floppy_disk',
    color: 'grey',
  })
}

config.sequelize.logging = config.switches.sequelize_logger
  ? createLogger
  : false

const seq = new Sequelize(
  config.sequelize.database,
  config.sequelize.username,
  config.secrets.postgres_password,
  Object.assign({}, config.sequelize, {
    // TODO: Sequelize has bug related to many reusable async connections. Remove it when fixed
    pool: {
      min:     0,
      max:     10,
      idle:    20000,
      acquire: 20000,
    },
  }),
)

// https://github.com/brianc/node-pg-parse-float
pgParseFloat(seq.connectionManager.lib)

seq.defineModel = function defineModel({ name, attrs, validate, sanitize, options = {} }) {
  function sanitizeFunction(obj) { return Sanitize.run(obj, sanitize) }
  function validateFunction(obj) { return Validate.run(obj, validate) }

  const model = seq.define(name, attrs, Object.assign({}, options, {
    hooks: {
      beforeValidate(value) {
        if (sanitize) sanitizeFunction(value.dataValues)
        if (validate) validateFunction(value.dataValues).throwIfInvalid()
      },
    },
  }))

  model.sanitizeConfig = sanitize
  model.validateConifg = validate

  model.sanitize = sanitizeFunction
  model.validate = validateFunction

  return model
}

export default seq
