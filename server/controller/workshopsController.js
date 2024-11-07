const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Workshop = require('../model/workshopsModel');

exports.search = async (req, res) =>{
    const searchTerm = req.query.searchTerm;
    const result = await Workshop.find({
         $or: [ 
                { nombre: { $regex: searchTerm, $options: 'i' } },
                { catergoria: { $regex: searchTerm, $options: 'i' } }, 
                { modalidad: { $regex: searchTerm, $options: 'i' } },
                { ubicacion: { $regex: searchTerm, $options: 'i' } },
                { descripcion: { $regex: searchTerm, $options: 'i' } }
            ] 
        }).select('-__v');

    if(result.length === 0) return res.status(404).send({ message: 'No workshops found matching the search term' });

    res.status(200).send({ message: 'Workshops fetched successfully', data: result });
}