import Sequelize from 'sequelize'
import db        from '@/lib/db'

export default db.defineModel({
  name: 'currency',

  attrs: {
    cryptocurrency: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      unique: 'compositeIndex',
    },
  },
})
