// server/middleware/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const multer = require('multer');
const path = require('path');
const os = require('os');

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, os.tmpdir());
    },
    filename: (req, file, cb) => {
        cb(null, `profile_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes'));
    }
});

// Función de subida a Cloudinary
const uploadToCloudinary = async (filePath, userId) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'profile_images',
            public_id: `user_${userId}_profile`
        });

        // Eliminar archivo temporal
        await fs.unlink(filePath);

        return result.secure_url;
    } catch (error) {
        console.error('Error en Cloudinary:', error);
        
        // Intentar eliminar archivo temporal si hay error
        try {
            await fs.unlink(filePath);
        } catch (unlinkError) {
            console.error('No se pudo eliminar archivo temporal:', unlinkError);
        }
        
        throw error;
    }
};

// IMPORTANTE: Exportar todo lo necesario
module.exports = {
    upload,
    uploadToCloudinary,  // Asegúrate de exportar esta función
    cloudinary
};