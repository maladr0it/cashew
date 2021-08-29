import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Transaction", {
    label: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "There must be a currency",
        },
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          args: true,
          msg: "A transaction must have an amount.",
        },
        isNumeric: {
          args: true,
          msg: "The amount must be number",
        },
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Users",
        key: "id",
        as: "sender",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Users",
        key: "id",
        as: "receiver",
      },
    },
  });
};
