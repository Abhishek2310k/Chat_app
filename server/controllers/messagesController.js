import messageModel from "../model/messageModel.js";
// const messageModel = require("../model/messageModel.js");

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json("Message added successfully");
    }

    return res.json("Failed to add message to the database");
  } catch (error) {
    next(error);
  }
};

export const getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }));

    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};
