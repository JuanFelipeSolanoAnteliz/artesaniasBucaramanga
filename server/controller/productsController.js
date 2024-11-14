const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Products = require('../model/productsModel');
const Users= require('../model/userModel');


exports.getOneById = async ( req, res )=>{
    try{
        let product = req.params.id;
        let updateUserInfo = await Users.find(
            { _id: new ObjectId(product) }
        )
        if(updateUserInfo.length === 0){ return res.status(404).json({status:200, message:'product not found'})}
        return res.status(200).json({ status: 200, message: 'Product fetched successfully', data:updateUserInfo});
    }catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, message: 'There was an error while fetching the product'});
    }
}


exports.markProductAsfav= async ( req, res) =>{
    try{
        let productFav = req.params.productId;
        let user = req.data.id;
        let updateUserInfo = await Users.updateOne(
            { _id: user },
            { $push: { favoritos: new ObjectId(productFav)} }
        )
        return res.status(214).json({ status: 214, message: 'Product added to favorites successfully', data:updateUserInfo});
    }catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, message: 'There was an error while adding the product to favorites'});
    }
}

exports.unMarkProductAsfav= async ( req, res) =>{
    try{
        let productFav = req.params.productId;
        let user = req.data.id;
        let updateUserInfo = await Users.updateOne(
            { _id: user },
            { $pull: { favoritos: new ObjectId(productFav)} }
        )
        return res.status(214).json({ status: 214, message: 'Product removed from favorites successfully', data:updateUserInfo});
    }catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, message: 'There was an error while removing the product from favorites'});
    }
}

exports.getAllProducts = async (req, res) =>{
    try{
        let result = await Products.find().select('-__v');
        if(result.length === 0)  res.status(404).send({'status':404,'message':'there is no products to fecth'});
        res.status(200).send({'status':200,'message':'products fetched correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).json({message:'Error al obtener los productos', error:error});
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
            artesanoId: new ObjectId('5f3e5f4c2c0e4a1d4c8b4572'),
            descuento:null
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
        if(search === ''){ return res.status(400).send({'status':400,'message':'Search param is not valid'})};
        let result = await Products.find({ $or: [ { nombre: { $regex: search, $options: 'i' } }, { descripcion: { $regex: search, $options: 'i' } } ] }).select('-__v');
        if(result.length === 0){return res.status(404).send({'status':404,'message':'No matching product found', 'data':result})};
        return res.status(200).send({'status':200,'message':'Products fetched correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error at fetch products', 'error':error});
    }
}

exports.getByCategory = async (req, res, ) => {
    try{
        let category = req.params.category;
        if(category === ''){ return res.status(400).send({'status':400,'message':'Category param is not valid'})};
        let result = await Products.find({  categoria: { $regex: new RegExp(category, 'i') } }).select('-__v');
        if(result.length === 0){return res.status(404).send({'status':404,'message':'No products found in this category', 'data':result})};
        return res.status(200).send({'status':200,'message':'Products fetched correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error at fetch products', 'error':error});
    }
}

exports.getDiscountsBycategory = async (req, res)=>{
    try{
        let category = req.params.category
        let result = await Products.find({ descuento: { $ne: null }, categoria:category });
        if(result.length === 0){return res.status(404).json({status:404, message:'There is not discounts to fetch'})}
        return res.status(200).json({status:200, message:'discounts fetched correctly', data:result})
    }catch(error){
        console.log(error);
        return res.status(500).json({status:500, message:'something went wrong while fetching discounts'});
    }
}

exports.getDiscounts = async (req, res)=>{
    try{
        let result = await Products.find({ descuento: { $ne: null } });
        if(result.length === 0){return res.status(404).json({status:404, message:'There is not discounts to fetch'})}
        return res.status(200).json({status:200, message:'discounts fetched correctly', data:result})
    }catch(error){
        console.log(error);
        return res.status(500).json({status:500, message:'something went wrong while fetching discounts'});
    }
}