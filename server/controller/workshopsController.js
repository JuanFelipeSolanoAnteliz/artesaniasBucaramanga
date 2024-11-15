const { ObjectId } = require('mongodb');
const connectDB = require('../helper/connect');
const Workshop = require('../model/workshopsModel');


exports.getOne = async (req, res) =>{
    try{
        let id = req.params.id
        let result = await Workshop.findOne({ _id: new ObjectId(id)});
        return res.status(200).json({ status: 200, message:'workshops fetched sucessfully', data:result});
    }catch(error){
        console.log(error)
        res.status(500).send({ message: 'Error while fetching workshops', error: error });     
    }
}

exports.getAll = async (req, res) =>{
    try{
        let result = await Workshop.find();
        if(result.length < 0){return res.status(404).json({ status:404, message:'there are not workshops to fetch'})};
        return res.status(200).json({ status: 200, message:'workshops fetched sucessfully', data:result});
    }catch(error){
        console.log(error)
        res.status(500).send({ message: 'Error while fetching workshops', error: error });     
    }
}

exports.search = async (req, res) =>{
    try{
        const searchTerm = req.query.searchTerm;
        const escapeRegex = (str) => {
            return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");  
          }
        if(searchTerm === '') return res.status(400).send({ satus:400, message: 'Search term is required' });
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
    }catch(error){
        console.log(error)
        res.status(500).send({ message: 'Error searching for workshops', error: error });  // Error handling for database operations. You might want to log this error or return a more specific error message.
    }


}