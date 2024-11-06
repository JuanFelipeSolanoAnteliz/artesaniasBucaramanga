const connectDB = require('../helper/connect');
const Products = require('../model/productsModel');

exports.getAllProducts = async (req, res) =>{
    try{
        let result = await Products.find();
        res.status(200).json(result);
    }catch(error){
        console.log(error)
    }
}