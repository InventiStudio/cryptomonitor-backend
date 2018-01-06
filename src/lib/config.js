import app from '@/../config/app.json'
import mail from '@/../config/mail.json'
import secrets from '@/../config/secrets.json'
import sequelize from '@/../config/sequelize.json'
import switches from '@/../config/switches.json'

const env = process.env.NODE_ENV

export default {
  env,
  app: app[env],
  mail: mail[env],
  secrets: secrets[env],
  sequelize: sequelize[env],
  switches: switches[env],
}
