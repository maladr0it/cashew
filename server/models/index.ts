import { Sequelize } from "sequelize";
import User from "./user";
import Transaction from "./transaction";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  },
);

const models = [User, Transaction];

for (const model of models) {
  model(sequelize);
}

function applyExtraSetup(sequelize) {
  const { User, Transaction } = sequelize.models;

  User.hasMany(Transaction, { foreignKey: "senderId", onDelete: "CASCADE" });
  User.hasMany(Transaction, {
    foreignKey: "receiverId",
    onDelete: "CASCADE",
  });
  Transaction.belongsToMany(User, {
    foreignKey: "senderId",
    through: "transactionSenders",
  });
  Transaction.belongsToMany(User, {
    foreignKey: "receiverId",
    through: "transactionReceivers",
  });
}

applyExtraSetup(sequelize);

export default sequelize;
