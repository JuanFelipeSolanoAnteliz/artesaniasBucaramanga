const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Pedidos = require('../model/paymentsModel');
const Vouchers = require('../model/voucherModel');
const Users = require('../model/userModel');
const Product = require('../model/productsModel');

exports.getHistory = async ( req, res ) => {
    try{
        let user = req.data.id;
        let result = await Pedidos.find(
            { usuarioId: new ObjectId(user) }
          );
        if( result.length === 0 ){return res.status(404).json({ status:404, message:' there is not a product with this id'})}
        return res.status(200).json({ status:200, message:'product fetched successfully', data:result});
    }catch(error){
        console.log(error);
        return res.status(500).json({ status:500, message:'error while fetching the product', error:error});
    }
} 

exports.getCart = async (req, res)=> {
    try{
        let user = req.data.id;
        let result = await Users.findOne(
            {_id: new ObjectId(user)},
            { carrito: 1},
            {_id:0}
        );
        if (!result){return res.status(404).json({ status:404, message:'not products'})}
        return res.status(200).json({ status:200, message:'products fetched successfully', data:result});
    }catch(error){
        console.log(error);
        return res.status(500).json({ status:500, message:'error while fetching the products', error:error});
    }
}

exports.addToCart = async (req, res) => {
    try {
        let product = req.params.id;
        let user = req.data.id;
        let validate = await Users.findOne({_id: new ObjectId(req.data.id)});
        validate.forEach(element => {
            if(element === product){ return res.status(200).json({ status: 200, message:'Product already added to cart'});        }
        });
        let updateUserInfo = await Users.updateOne(
            { _id: new ObjectId(user) },
            { $push: { carrito: new ObjectId(product)} }
        );
        if ( updateUserInfo === false){ return res.status(304).json({ status:304, message:'can not add the product to the cart'}); }
        return res.status(214).json({ status: 214, message:'Product added to cart', data: updateUserInfo });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error while adding to cart', error: error });     
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
            for (const element of products) {
                await Product.updateOne({ _id: element.productoId, stock: { $gt: 0 } }, { $inc: { stock: - element.cantidad } });
                let precioProducto = await Product.findOne({_id: element.productoId});
                let operation = precioProducto.precio * element.cantidad;
                result += operation;
            }
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
        console.log(await getPrice())
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