const MIN_NAME_LENGHT = 5;
const MAX_NAME_LENGHT = 25;

const MIN_FEEDBACK_LENGHT = 10;
const MAX_FEEDBACK_LENGHT = 200;

const MIN_QUESTION_LENGHT = 10;
const MAX_QUESTION_LENGHT = 100;

const MIN_TITLE_LENGHT = 5;
const MAX_TITLE_LENGHT = 30;

const MIN_DESCRIPTION_LENGHT = 10;
const MAX_DESCRIPTION_LENGHT = 600;

exports.getValidationErrorsFeedback = function(name, feedback) {
    const validationErrors = []

    if(name.length < MIN_NAME_LENGHT)
    validationErrors.push("Name is to short")

    if(name.length > MAX_NAME_LENGHT)
    validationErrors.push("Name is to long")

    if(feedback.length < MIN_FEEDBACK_LENGHT)
        validationErrors.push("Feedback is to short")

    if(feedback.length > MAX_FEEDBACK_LENGHT)
    validationErrors.push("Feedback is to long")

    return validationErrors;
}

exports.getValidationErrorsQuestion = function(name, question) {
    const validationErrors = []

    if(name.length < MIN_NAME_LENGHT)
    validationErrors.push("Name is to short")

    if(name.length > MAX_NAME_LENGHT)
    validationErrors.push("Name is to long")

    if(question.length < MIN_QUESTION_LENGHT)
        validationErrors.push("Question is to short")

    if(question.length > MAX_QUESTION_LENGHT)
    validationErrors.push("Question is to long")

    return validationErrors;
}

exports.getValidationErrorsProjectText = function(title, desc1, desc2) {
    const validationErrors = []

    if(title.length < MIN_TITLE_LENGHT)
    validationErrors.push("Name is to short")

    if(title.length > MAX_TITLE_LENGHT)
    validationErrors.push("Name is to long")

    if(desc1.length < MIN_DESCRIPTION_LENGHT)
        validationErrors.push("First description is to short")

    if(desc1.length > MAX_DESCRIPTION_LENGHT)
    validationErrors.push("First description is to long")

    if(desc2.length < MIN_DESCRIPTION_LENGHT)
        validationErrors.push("Second description is to short")

    if(desc2.length > MAX_DESCRIPTION_LENGHT)
    validationErrors.push("Second description is to long")

    return validationErrors;
}

function isImage(file) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        return true
      } 
    else {
        return false
    }
}

exports.validateImageFile = function(img1, img2) {
    const validation = []

    if(img1 && !isImage(img1[0])) {
        validation.push('image1 is the wrong filetype')
    }
    if(img2 && !isImage(img2[0])) {
        validation.push('image2 is the wrong filetype')
    }
    return validation
}

exports.getValidationProjectImages = function(img1, img2) {
    const validation = []

    if(!img1)
    validation.push(False)
    else
    validation.push(True)

    if(!img2)
    validation.push(False)
    else
    validation.push(True)

    return validation;
}

exports.validateLogin = function(username, password) {
    const validation = []
    if(!username || !password)
        validation.push('wrong username or password')
    
    return validation
}

exports.isLoggedIn = function(req, res, next) {
    if(req.session.isLoggedIn)
        return next()
    res.render('notLoggedInError.hbs')
}