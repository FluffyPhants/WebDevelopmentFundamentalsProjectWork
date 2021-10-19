const path = require('path')
const multer = require('multer')

//https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
const storage = multer.diskStorage({
    //define storage location for out images
    destination: function(req, file, cb) {
        cb(null, 'static/uploads/');
    },
    //add back date and fileextension to our image
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

exports.upload = multer({ storage: storage}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1}]);

