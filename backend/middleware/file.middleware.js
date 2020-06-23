const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/tiff' : 'tiff',
    'video/mpeg': 'mpeg',
    'video/mp4' : 'mp4',
    'audio/wav' : 'wav',
    'audio/mpeg': 'mpeg',
    'application/pdf' : 'pdf'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        callback(error, "backend/uploads");
    },
    filename: (req, file, callback) => {

        const name = file.fieldname.toLowerCase().split(' ').join('-');
        console.log(name);
        const ext = MIME_TYPE_MAP[file.mimetype];

        callback(null, name + '-' + Date.now() + '.' + ext);
    }

});

module.exports = multer({ storage: storage });
