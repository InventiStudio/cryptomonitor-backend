import Sequelize from 'sequelize'
import db        from '@/lib/db'
import validate  from '@/utils/validate'

export default db.defineModel({
  name: 'user',

  attrs: {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },

  sanitize: {
    email: { type: 'string', rules: ['trim'] },
  },

  validate: {
    email: validate.preset('email', { optional: false }),
  },
})
