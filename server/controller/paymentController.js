const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Pedidos = require('../model/paymentsModel');

exports.addOrder = async(req, res) => {
    let result = await Pedidos.find();
    return res.status(200).json({ status:200, message: 'Order added correctly', data:result});
}