const connectDB = require('../helper/connect');
const Products = require('../model/productsModel');

exports.getAllProducts = async (req, res) =>{
    try{
        let result = await Products.find();
        if(result.length === 0)  res.status(404).send({'status':404,'message':'there is no products to fecth'});
        res.status(200).send({'status':200,'message':'products fetched correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error al obtener los productos', 'error':error});
    }
}