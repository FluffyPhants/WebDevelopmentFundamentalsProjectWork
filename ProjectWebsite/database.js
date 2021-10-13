const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')

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
    const query2 = "SELECT * FROM projectFeedback where projectId = ? ORDER BY id DESC"
    return new Promise(function (resolve, reject) {
            db.all(query2,[projectId], function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            });
        });
}

exports.selectAllAmaQuestions = function(callback) {
    const query = "SELECT * FROM amaQuestions ORDER BY id DESC"

    db.all(query, function (error, questions) {
        callback(error, questions)
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

//projects-router and project-router still to go