import moment from 'moment'
import bcrypt from 'bcryptjs'
import User from '@/models/user'
import Session from '@/models/session'

export async function createUser({ email, password }) {
  const hash = await bcrypt.hash(password, 10)
  return User.create({ email, hash })
}

export async function login({ email }) {
  const { id: userId } = await User.findOne({ where: { email } })
  return Session.create({ expiresAt: moment().add(30, 'days').format(), userId })
}
