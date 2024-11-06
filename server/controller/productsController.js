const connectDB = require('../helper/connect');
const Products = require('../model/productsModel');

exports.getAllProducts = async (req, res) =>{
    try{
        let result = await Products.find();
        
        res.status(200).send({'status':200,'message':'products fetched correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error al obtener los productos', 'error':error});
    }
}