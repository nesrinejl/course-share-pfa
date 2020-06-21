const multer = require('multer');

const MIME_TYPE_MAP = {
    'file/png': 'png',
    'file/jpg': 'jpg',
    'file/jpeg': 'jpeg',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        callback(error, "backend/images");
    },
    filename: (req, file, callback) => {

        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + '-' + Date.now() + '.' + ext);
    }

});

module.exports = multer({ storage: storage }).single('file');
