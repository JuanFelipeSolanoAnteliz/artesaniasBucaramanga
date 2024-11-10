const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Pedidos = require('../model/paymentsModel');

exports.addOrder = async(req, res) => {
    try{
        let getPrice = async ()=>{
            let products = req.body.productos;
            let result = 0;
            products.forEach(element => {
                let operation = element.precio * element.cantidad;
                result += operation;
            });
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