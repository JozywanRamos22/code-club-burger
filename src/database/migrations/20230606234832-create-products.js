'use strict'

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allownull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allownull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allownull: false,
      },
      category: {
        type: Sequelize.STRING,
        allownull: false,
      },
      path: {
        type: Sequelize.STRING,
        allownull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('products')
  },
}
