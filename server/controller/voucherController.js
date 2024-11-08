const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Vouchers = require('../model/voucherModel');

exports.addVoucher = async (req, res) =>{
    try{
        let body = req.body
        const newVoucher = new Vouchers ( {
            codigo:body.codigo ,
            descuento: body.descuento,
            tipo: body.tipo,
            fechaExpiracion: Date(body.fechaExpiracion),
            usuarioId: body.usuarioId === null ? null: new ObjectId(body.usuarioId) 
        })
        let result = await newVoucher.save();
        res.status(200).send({'status':201,'message':'Voucher created correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error at create Voucher', 'error':error});
    }
}