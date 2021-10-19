const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')

const multer = require('multer')
const path = require('path')


exports.selectAllProjects = function(callback) {
    const query = "SELECT * FROM projects ORDER BY id DESC"

    db.all(query, function (error, projects) {
        callback(error, projects)
    })
}

exports.selectFromProjectsByID = async function(id) {
    const query1 = "SELECT * FROM projects where id = ? LIMIT 1"
    return new Promise(function (resolve, reject) {
            db.all(query1,[id], function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result[0])
                }
            });
        });
}

exports.selectLastThreeProjects = function(callback) {
    const query = "SELECT * FROM projects ORDER BY id DESC LIMIT 3"

    db.all(query, function (error, projects) {
        callback(error, projects)
    })
}

exports.deleteProjectById = function(id, callback) {
    const query = "DELETE FROM projects WHERE id = ?"
    const values = [id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

exports.selectProjectFeedbackFromProjectID = async function(projectId) {
    const query = "SELECT * FROM projectFeedback where projectId = ? ORDER BY id DESC"
    return new Promise(function (resolve, reject) {
            db.all(query,[projectId], function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            });
        });
}

exports.postProjectFeedback = function(name, feedback, id, callback) {
    const query = "INSERT INTO projectFeedback (name, feedback, projectId) VALUES (?, ?, ?)"
    const values = [name, feedback, id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

exports.deleteProjectFeedbackById = function(id, callback) {
    const query = "DELETE FROM projectFeedback WHERE id = ?"
    const values = [id]

    db.run(query, values, function (error) {
        callback(error)
    }) 
}

exports.updateProjectFeedbackById = function(name, feedback, id, callback) {

    query = "UPDATE projectFeedback SET name = ?, feedback = ? WHERE id = ?"
    values = [name, feedback, id]
    db.run(query, values, function (error) {
        callback(error)
    })
}

exports.selectProjectFeedbackById = function(id, callback) {
    const query = "SELECT * FROM projectFeedback WHERE id = ?"
    const values = [id]

    db.all(query, values, function (error, feedback) {
        callback(error, feedback)
    }) 
}


exports.selectAllAmaQuestions = function(callback) {
    const query = "SELECT * FROM amaQuestions ORDER BY id DESC"

    db.all(query, function (error, questions) {
        callback(error, questions)
    })
}

exports.selectAmaQuestionById = function(id, callback) {
    const query = "SELECT * FROM amaQuestions WHERE id = ?"
    const values = [id]

    db.all(query, values, function(error, question) {
        callback(error, question)
    })
}

exports.updateAmaQuestionById = function(name, question, id, callback) {

    query = "UPDATE amaQuestions SET name = ?, question = ? WHERE id = ?"
    values = [name, question, id]
    db.run(query, values, function (error) {
        callback(error)
    })
}

exports.postAmaQuestion = function(name, question, callback) {
    const query = "INSERT INTO amaQuestions (name, question) VALUES (?, ?)"
    const values = [name, question]

    db.run(query, values, function (error) {
        callback(error)
    })
}

exports.deleteAmaQuestionById = function(id, callback) {
    const query = "DELETE FROM amaQuestions WHERE id = ?"
    const values = [id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

//https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
const storage = multer.diskStorage({
    //define storage location for out images
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    //add back date and fileextension to our image
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1}]);

exports.uploadProject = function(title, desc1, img1path, desc2, img2path, callback) {

        const query = "INSERT INTO projects (projectName, description1, image1path, description2, image2path) VALUES (?, ?, ?, ?, ?)"
        const values = [title, desc1, img1path, desc2, img2path]

        db.run(query, values, function (error) {
            callback(error)
        })
}

exports.updateProject = function(title, desc1, img1path, desc2, img2path, id, callback) {

    query = "UPDATE projects SET projectName = ?, description1 = ?, image1path = ?, description2 = ?, image2path = ? WHERE id = ?"
    values = [title, desc1, img1path, desc2, img2path, id]
        
    db.run(query, values, function (error) {
        callback(error)
    })
}