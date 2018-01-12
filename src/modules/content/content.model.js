import Sequelize from 'sequelize'
import db        from '@/lib/db'

export default db.defineModel({
  name: 'content',

  attrs: {
    key: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    languageSlug: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    },
  },

  sanitize: {
    key:   { type: 'string', rules: ['trim'] },
    value: { type: 'string', rules: ['trim'] },
  },
})
