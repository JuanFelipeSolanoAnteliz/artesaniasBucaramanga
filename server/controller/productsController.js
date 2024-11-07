const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Products = require('../model/productsModel');

exports.getAllProducts = async (req, res) =>{
    try{
        let result = await Products.find().select('-__v');
        if(result.length === 0)  res.status(404).send({'status':404,'message':'there is no products to fecth'});
        res.status(200).send({'status':200,'message':'products fetched correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error al obtener los productos', 'error':error});
    }
}

exports.addProduct = async (req, res)=>{
    //artesanoId: req.data._id
    try{
        let newProduct = new Products({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            categoria: req.body.categoria,
            fotos: req.body.fotos,
            stock: req.body.stock,
            artesanoId: new ObjectId('5f3e5f4c2c0e4a1d4c8b4572')
        },
        {
            versionKey: false 
        }); 
        let result = await newProduct.save();
        res.status(201).json({status: 201,message: 'Product added successfully',data: result});
    }catch(error){
            console.log(error);
            res.status(500).send({message: 'Error while adding the product',error: error});
    }
}

exports.searchProduct = async ( req, res ) =>{
    try{
        let search = req.query.searchTerm;
        if(!search) res.status(400).send({'status':400,'message':'Search param is not valid', 'data':result});
        let result = await Products.find({ $or: [ { nombre: { $regex: search, $options: 'i' } }, { descripcion: { $regex: search, $options: 'i' } } ] }).select('-__v');
        if(result.length === 0)  res.status(404).send({'status':404,'message':'No matching product found', 'data':result});
        res.status(200).send({'status':200,'message':'Products fetched correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error at fetch products', 'error':error});
    }
}
