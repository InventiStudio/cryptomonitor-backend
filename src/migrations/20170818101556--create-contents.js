module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('contents', {
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      languageSlug: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'languages',
          key: 'slug',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down(queryInterface) {
    queryInterface.dropTable('contents')
  },
}
