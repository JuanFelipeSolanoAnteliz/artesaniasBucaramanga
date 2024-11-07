const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Workshop = require('../model/workshopsModel');

exports.search = async (req, res) =>{
    const searchTerm = req.query.searchTerm;
    const escapeRegex = (str) => {
        return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");  
      }
    const safeSearchTerm = escapeRegex(searchTerm);
    const result = await Workshop.find({
         $or: [ 
                { nombre: { $regex: safeSearchTerm, $options: 'i' } },
                { modalidad: { $regex: safeSearchTerm, $options: 'i' } },
                { ubicacion: { $regex: safeSearchTerm, $options: 'i' } },
                { descripcion: { $regex: safeSearchTerm, $options: 'i' } }
            ] 
        }).select('-__v');

    if(result.length === 0) return res.status(404).send({ message: 'No workshops found matching the search term', data:result });

    res.status(200).send({ message: 'Workshops fetched successfully', data: result });
}