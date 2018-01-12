import Sequelize from 'sequelize'
import db        from '@/lib/db'

export default db.defineModel({
  name: 'language',

  attrs: {
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },

  sanitize: {
    slug: { type: 'string', rules: ['trim'] },
    name: { type: 'string', rules: ['trim'] },
  },
})
