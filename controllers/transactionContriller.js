const Transaction = require('../models/transaction');

exports.getAll = async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
};

exports.create = async (req, res) => {
  const { amount, type, note } = req.body;
  if (!amount || !type) return res.status(400).json({ message: 'Amount and type are required.' });
  const newTransaction = new Transaction({ amount, type, note });
  await newTransaction.save();
  res.status(201).json(newTransaction);
};

exports.update = async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.remove = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
