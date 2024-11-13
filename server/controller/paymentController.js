const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Pedidos = require('../model/paymentsModel');
const Vouchers = require('../model/voucherModel');
const Users = require('../model/userModel');

exports.addToCart = async (req, res) => {
    try {
        let product = req.params.id;
        let user = req.data.id;
        let updateUserInfo = await Users.updateOne(
            { _id: new ObjectId(user) },
            { $push: { carrito: new ObjectId(product)} }
        );
        if ( updateUserInfo === false){ return res.status(304).json({ status:304, message:'can not add the product to the cart'}); }
        res.status(214).json({ status: 214, message:'Product added to cart', data: updateUserInfo });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while adding to cart', error: error });     
    }
}


exports.removeFromCart = async (req, res) => {
    try {
        let product = req.params.id;
        let user = req.data.id;
        let updateUserInfo = await Users.updateOne(
            { _id: new ObjectId(user) },
            { $pull: { carrito: new ObjectId(product)} }
        );
        if ( updateUserInfo === false){ return res.status(304).json({ status:304, message:'can not remove the product to the cart'}); }
        res.status(214).json({ status: 214, message:'Product removed from cart', data: updateUserInfo });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while removing from cart', error: error });     
    }
}

exports.addOrder = async(req, res) => {
    try{
        let getPrice = async ()=>{
            let products = req.body.productos;
            let result = 0;
            products.forEach(element => {
                let operation = element.precio * element.cantidad;
                result += operation;
            });
            if(req.body.voucher){
                let voucher = await Vouchers.findOne({_id: new ObjectId(req.body.voucher)});
                let now = new Date();
                if(voucher.fechaExpiracion < now ){
                    return result;
                }
                if(voucher.length > 0 || voucher.usuarioId === null || voucher.usuarioId === req.data.id){
                    let discount = (result*voucher.descuento) / 100;
                    let finalPrice = result - discount;
                    let updateDate = await Vouchers.findOneAndUpdate(
                        { _id: voucher._id }, 
                        { $set: { fechaExpiracion: new Date()} }
                      );
                    return finalPrice;
                }
            }
            return result;
        }

        let totalPrice = await getPrice();
        let newPedido = new Pedidos({
            usuarioId: new ObjectId(req.data.id),
            productos: req.body.productos,
            total: parseInt(totalPrice),
            fecha: new Date(),
            estado: "pendiente"
          })
    
        let result = await newPedido.save();
        return res.status(200).json({ status:200, message: 'Order added correctly', data:result});
    }catch(error){
        console.log(error);
        return res.status(500).json({ status:500, message:'error while adding the order'})
    }
    
}