import crypto from 'crypto'
import config from '@/lib/config'

const algorithm = 'aes-256-ctr'
const cipherKey = config.secrets.cipher_key

export function encrypt(text) {
  const cipher = crypto.createCipher(algorithm, cipherKey)
  const crypted = cipher.update(text, 'utf8', 'hex')
  return `${crypted}${cipher.final('hex')}`
}

export function decrypt(text) {
  const decipher = crypto.createDecipher(algorithm, cipherKey)
  const dec = decipher.update(text, 'hex', 'utf8')
  return `${dec}${decipher.final('utf8')}`
}
