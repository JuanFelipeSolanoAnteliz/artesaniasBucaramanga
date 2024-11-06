const connectDB = require('../helper/connect');
const Users = require('../model/userModel');

connectDB();

exports.getAllUsers = async (req, res)=>{
    try{
        let result = await Users.find();
        res.status(200).json(result);
    }catch(error){
        console.log(error)
    }
}

