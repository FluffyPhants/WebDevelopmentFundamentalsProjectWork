const imageFilter = function(request, file, cb) {
    //Accepting only files ending on image file extensions
    if(file.originalname.match("/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/")) {
        request.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}
exports.imageFilter = imageFilter;