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

exports.getVouchers = async ( req, res ) =>{
    try{
        let now = new Date();
        let result = await Vouchers.find({
                fechaExpiracion: { $gte: now },
                $or:[
                    {usuarioId:null},
                    {usuarioId:req.data.id}                    
                ]
        });
        if(result.length === 0 ){return res.status(404).json({ status: 404, message:'there are no vouchers available'})};
        // console.log(req.data.id)
        return res.status(200).json({ status: 200, message:'Vouchers fetched correctly.', data:result});
    }catch(error){
        console.log(error)
        res.status(500).send({'message':'Error while fetching Vouchers', 'error':error})
    }
}