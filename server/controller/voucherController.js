const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Vouchers = require('../model/voucherModel');

exports.addVoucher = async (req, res) =>{
    try{
        let body = req.body
        const newVoucher = new Vouchers ( {
            codigo:body.codigo ,
            descuento: body.decuento,
            tipo: body.tipo,
            fechaExpiracion: body.date,
            usuarioId: body.usuarioId || null
        })
        let result = await newVoucher.save();
        res.status(200).send({'status':201,'message':'Voucher created correctly', 'data':result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error at fecth Vouchers', 'error':error});
    }
}