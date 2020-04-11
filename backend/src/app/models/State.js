import Sequelize, { Model } from 'sequelize';

class State extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        acronym: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default State;
