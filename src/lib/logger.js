import colors from 'colors/safe'
import emoji  from 'node-emoji'
import moment from 'moment'
import _      from 'lodash'

export default function logger(string, { icon, color, style }) {
  console.log( // eslint-disable-line no-console
    colors.gray.inverse(`[${moment().format('YYYY-MM-DD HH:mm')}]`),
    emoji.get(icon),
    '',
    _.get(colors, _.compact([color, style]))(string),
  )
}
