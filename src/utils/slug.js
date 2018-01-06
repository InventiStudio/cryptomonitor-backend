/**
 * @module utils/slug
 * @example import slug from '@/utils/slug'
 * @desc Simple function that generate slug
 */

import slug from 'slug'

const defaultConfig = {
  replacement: '-',
  lower: true,
}

/**
 * @static
 * @name    _default
 * @alias   module:utils/slug
 * @param   {String}  text input value
 * @param   {Object}  [config]
 * @param   {String}  [config.replacement=-] Separator
 * @param   {Blolean} [config.lower=true] True if slug should be lowercase.
 * @returns {String}  slug
 */
export default function genSlug(text, config = {}) {
  return slug(text, { ...defaultConfig, ...config })
}
