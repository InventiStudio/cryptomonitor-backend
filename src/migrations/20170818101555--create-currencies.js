module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('currencies', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
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
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down(queryInterface) {
    queryInterface.dropTable('sessions')
  },
}
