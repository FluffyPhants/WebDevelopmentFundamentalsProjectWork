const express = require('express')
const expressHandlebars = require('express-handlebars')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')
const path = require('path')
const multer = require('multer')
const helpers = require('./helpers')
const { response } = require('express')


//https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
const storage = multer.diskStorage({
    //define storage location for out images
    destination: function(request, file, cb) {
        cb(null, 'static/uploads/');
    },
    //add back date and fileextension to our image
    filename: function(request, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const app = express()

app.use(express.static(__dirname + '/static'))

app.use(express.urlencoded({
    extended: false
}))

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs'
}))

db.run("PRAGMA foreign_keys = ON");

app.get('/', function (request, response) {
    response.locals = {
        homeTab: true
    }

    db.all("SELECT * FROM projects ORDER BY id DESC LIMIT 3", function (error, projects) {
        if (error) {
            const model = {
                hasDatabaseError: true,
                projects: []
            }
            response.render('home.hbs', model)
        }
        else {
            const model = {
                hasDatabaseError: false,
                projects
            }
            response.render('home.hbs', model)
        }
    })
})

app.get('/projects', function (request, response) {
    response.locals = {
        projectsTab: true
    }

    db.all("SELECT * FROM projects ORDER BY id DESC", function (error, projects) {
        if (error) {
            const model = {
                hasDatabaseError: true,
                projects: []
            }
            response.render('projects.hbs', model)
        }
        else {
            const model = {
                hasDatabaseError: false,
                projects
            }
            response.render('projects.hbs', model)
        }
    })
})

app.get('/createProject', function(request, response) {
    response.render('createProject.hbs')
})


const upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1}]);
app.post('/projects/create', function(request, response) {
    // 'image-1' and 'image-2' is the names of our file input fields in the HTML form
    
        // req.files contains information of uploaded files
        // req.body contains information of text fields, if there were any
        upload(request, response, function(err) {

            if (request.fileValidationError) {
                return response.send(request.fileValidationError);
            }
            else if (!request.files) {
                return response.send('Please select a first image to upload');
            }
            else if (!request.files['image2']) {
                return response.send('Please select a second image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return response.send(err);
            }
            else if (err) {
                return response.send(err);
            }

            let firstImagePath = request.files['image1'][0].path
            let firstImagePathCorrected = firstImagePath.replace('static/', '/')
            let secondImagePath = request.files['image2'][0].path
            let secondImagePathCorrected = secondImagePath.replace('static/', '/')

            const query = "INSERT INTO projects (projectName, description1, image1path, description2, image2path) VALUES (?, ?, ?, ?, ?)"
            const values = [request.body['projectTitle'], request.body['firstImageDescription'], firstImagePathCorrected, request.body['secondImageDescription'], secondImagePathCorrected]

            db.run(query, values, function (error) {
                response.redirect('/projects');
            })
        })  
})
//gör om som aljona har sina promises 

async function selectFromProjectsByID(id) {
    const query1 = "SELECT * FROM projects where id = ? LIMIT 1";
    return new Promise(function (resolve, reject) {
            db.all(query1,[id], function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
        });
}

async function selectProjectFeedbackFromProjectID(projectId) {
    const query2 = "SELECT * FROM projectFeedback where projectId = ? ORDER BY id DESC";
    return new Promise(function (resolve, reject) {
            db.all(query2,[projectId], function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
}

app.get('/project/:id/delete', async function (request, response) {
    const id = request.params.id;

    try {
        const project = await selectFromProjectsByID(id);
        const model = {
            hasDatabaseError: false,
            project
        }
        response.render('deleteProject.hbs', model)
    }
    catch(error) {
        //TODO
    }
})

app.post('/project/:id/delete', function(request, response) {
    const id = request.params.id
	
	// TODO: Check if the user is logged in, and only carry
	// out the request if the user is.

    const query = "DELETE FROM projects WHERE id = ?"
    const values = [id]

    db.run(query, values, function (error) {
        response.redirect('/projects');
    })
})

app.get('/project/:id/update', async function(request, response) {
    const id = request.params.id

    try{
        const project = await selectFromProjectsByID(id)
        const model = {
            project
        }
        response.render('updateProject.hbs', model)
    }
    catch(error) {
        //TODO
        console.log(error)
    }
})

app.post('/comment/:id/delete', function(request, response) {
    const id = request.params.id
	
	// TODO: Check if the user is logged in, and only carry
	// out the request if the user is.

    const query = "DELETE FROM projectFeedback WHERE id = ?"
    const values = [id]

    db.run(query, values, function (error) {
        response.redirect(request.headers.referer + '#feedback');
    })
}) 

app.get('/project/:id/:status', function (request, response) {
    const id = request.params.id;
    const status = request.params.status;

    const queryResults = Promise.allSettled([selectFromProjectsByID(id), selectProjectFeedbackFromProjectID(id)]).then(values => {
        let model = {}

        if (values[0].status == "rejected") {
            model.hasProjectDatabaseError = true
            model.project = []
        }
        else {
            model.hasProjectDatabaseError = false
            model.project = values[0].value
        }
        if (values[1].status == "rejected") {
            model.hasFeedbacksDatabaseError = true
            model.feedbacks = []
        }
        else {
            model.hasFeedbacksDatabaseError = false
            model.feedbacks = values[1].value
        }
        //om en url slutar på #something så har den grejen fokus och du kan lägga tex div:focused till display block och annars till display none för show och hide på grejer utan js
        if(status == "info") {
            model.submitFeedback = false
        }
        else {
            model.submitFeedback = true
        }

        response.render('project.hbs', model)
    }
    )
})

app.post('/project/post', function (request, response) {

    const name = request.body.name
    const feedback = request.body.feedback
    const id = request.body.id

    //TODO: Add validation and display error messages.
    //TODO: add validation to make sure project exists

    // db.all("SELECT * FROM projects where id = ?", [id], function (error, project) {
    //     if (error) {
    //         const model = {
    //             hasDatabaseError: true,
    //             questions: []
    //         }
    //         response.render('about.hbs', model)
    //     }
    //     else {
    //         const model = {
    //             hasDatabaseError: false,
    //             questions
    //         }
    //         response.render('about.hbs', model)
    //     }
    // })

    const query = "INSERT INTO projectFeedback (name, feedback, projectId) VALUES (?, ?, ?)"
    const values = [name, feedback, id]

    db.run(query, values, function (error) {
        response.redirect('/project/'+id+'/info')
    })
})

app.get('/about', function (request, response) {
    response.locals = {
        aboutTab: true
    }

    db.all("SELECT * FROM amaQuestions ORDER BY id DESC", function (error, questions) {
        if (error) {
            const model = {
                hasDatabaseError: true,
                questions: []
            }
            response.render('about.hbs', model)
        }
        else {
            const model = {
                hasDatabaseError: false,
                questions
            }
            response.render('about.hbs', model)
        }
    })
})

app.post('/about/post', function (request, response) {

    const name = request.body.name
    const question = request.body.question

    // TODO: Add validation and display error messages.

    const query = "INSERT INTO amaQuestions (name, question) VALUES (?, ?)"
    const values = [name, question]

    db.run(query, values, function (error) {
        response.redirect('/about')
    })
})

app.listen(8080)




