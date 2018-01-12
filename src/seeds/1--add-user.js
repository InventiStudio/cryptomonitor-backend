import bcrypt from 'bcryptjs'
import User from '@/modules/user/user.model'

export default {
  async seed() {
    const hash = await bcrypt.hash('password', 10)
    await User.create({
      email: 'john.doe@mail.com',
      hash,
    })
  },
}
