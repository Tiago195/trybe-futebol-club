module.exports = {
  /**
   * 
   * @param {import("sequelize").QueryInterface} queryInterface 
   * @param {import("sequelize")} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};
