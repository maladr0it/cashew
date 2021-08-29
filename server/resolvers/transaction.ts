export default {
  Query: {
    transactions: async (parent, { senderId }, { models }) => {
      return await models.Transaction.findAll();
    },
    transaction: async (parent, { id }, { models }) => {
      return await models.Transaction.findByPk(id);
    },
  },

  Mutation: {
    createTransaction: async (
      parent,
      { label, senderUsername, receiverUsername, amount },
      { models },
    ) => {
      try {
        const sender = await models.User.findOne({
          where: { username: senderUsername },
        });
        const receiver = await models.User.findOne({
          where: { username: receiverUsername },
        });
        if (!sender || !receiver) {
          throw Error("Can't find sender or receiver");
        }
        return await models.Transaction.create({
          label,
          amount,
          senderId: sender.id,
          receiverId: receiver.id,
          currency: "USD",
        });
      } catch (err) {
        console.error(err);
      }
    },

    deleteTransaction: async (parent, { id }, { models }) => {
      return await models.Transaction.destroy({
        where: {
          id,
        },
      });
    },
  },

  Transaction: {
    sender: async (transaction, args, { models }) => {
      return await models.User.findByPk(transaction.senderId);
    },
    receiver: async (transaction, args, { models }) => {
      return await models.User.findByPk(transaction.receiverId);
    },
  },
};
