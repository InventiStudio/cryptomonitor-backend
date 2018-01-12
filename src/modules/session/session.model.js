import Sequelize from 'sequelize'
import db        from '@/lib/db'

export default db.defineModel({
  name: 'session',

  attrs: {
    expiresAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
})
