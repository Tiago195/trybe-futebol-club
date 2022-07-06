module.exports = {
  /**
   * 
   * @param {import("sequelize").QueryInterface} queryInterface 
   * @param {import("sequelize")} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
