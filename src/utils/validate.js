/**
 * @module utils/validate
 * @example import validate from '@/utils/validate'
 * @desc Validation utility
 */

import { validate } from 'schema-inspector'
import error        from '@/lib/error'

// TODO: We have to set `optional: true` to every key in validation,
// as we don't want to pass every property when e.g PATCH

const presets = {
  id: {
    type: 'integer',
    gt:   0,
    lte:  2147483647,
  },
  email: {
    type:    'string',
    pattern: 'email',
    error: 'must be valid email address',
  },
  uuid: {
    type:    'string',
    pattern: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    error:   'must be valid uuid',
  },
}

/**
 * @typedef Wrapper
 * @chainable
 */
function wrap(data) {
  /** @lends module:utils/validate~Wrapper */
  const wrapper = {
    /**
     * @param {String} [name=ValidationError] Name of error that should be thrown
     * @returns {Wrapper} Wrapper if no errors
     */
    throwIfInvalid(name = 'ValidationError') {
      return !data.valid
        ? error.throw({ name, data })
        : wrapper
    },
    /**
     * @returns {Object} Error data
     */
    get() {
      return !data.valid ? data.error : undefined
    },
    /**
     * @desc Let's you call next if no errors
     */
    async otherwise(next) {
      await next()
    },
  }
  return wrapper
}

/**
 * @static
 * @param   {Object} data object that should be validated
 * @param   {Object} schema validation schema
 * @param   {Object} [options] Options passed to schema-inspector validator
 * @returns {Wrapper} Wrapped result of validation
 * @desc It runs validation
 */
function run(data, schema, options) {
  return wrap(validate({ type: 'object', properties: schema }, data, options))
}

/**
 * @static
 * @param {Object} data object that should be validated
 * @desc Runs validation
 */
function preset(presetName, ext = {}) {
  return Object.assign({}, presets[presetName], ext)
}

export default {
  run,
  preset,
}
