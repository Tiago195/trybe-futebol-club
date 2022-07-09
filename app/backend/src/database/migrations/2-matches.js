module.exports = {
  /**
   * 
   * @param {import("sequelize").QueryInterface} queryInterface 
   * @param {import("sequelize")} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'teams'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'teams'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      in_progress: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: true
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};
