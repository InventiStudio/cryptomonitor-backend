import { sanitize } from 'schema-inspector'

function run(data, schema) {
  sanitize({ type: 'object', properties: schema }, data)
  return data
}

export default {
  run,
}
