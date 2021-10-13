const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')


const multer = require('multer')
const helpers = require('./helpers')

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

router.param('id', async function(req, res, next, id) {
    try{
        const project = await selectFromProjectsByID(id)
        const feedbacks = await selectProjectFeedbackFromProjectID(id)
        req.project = project
        req.feedback = feedbacks
        req.DbError = false
    }
    catch{
        req.project = [],
        req.feedback = [],
        req.DbError = true
    }
    next()
})

router.route('/:id')
    .all(/*TODO add user validation*/)
    .get(function(req, res) {
        const model = {
            project: req.project,
            feedbacks: req.feedback,
            dbError: req.dbError
        }
        res.render('project.hbs', model)
    })
    .post(function(req, res) {

    })

router.route('/:id/delete')
    .all(/*TODO add user validation*/)
    .get(function(req, res) {
            const model = {
                dbError: req.dbError,
                project: req.project
            }
            res.render('deleteProject.hbs', model)
    })
    .post(function(req, res) {
        // TODO: Check if the user is logged in, and only carry
	    // out the request if the user is.

        const query = "DELETE FROM projects WHERE id = ?"
        const values = [req.project.id]

        db.run(query, values, function (error) {
            res.redirect('/projects');
        })
    })

router.route('/:id/update')
    .all(/*TODO add user validation*/)
    .get(function(req, res) {
        const model = {
            project: req.project,
            dbError: req.dbError
        }
        res.render('updateProject.hbs', model)
    })
    .post(function(req, res) {
        const upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1}]);
        upload(req, res, function(err) {
            let img1 = true;
            let img2 = true;

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            if (!req.files['image1']) {
                img1 = false;
            }
            if (!req.files['image2']) {
                img2 = false;
            }
            if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            //add check to se if file has changed otherwise leave alone

            let query;
            let values;

            if(img1) {
                let firstImagePath = req.files['image1'][0].path
                let firstImagePathCorrected = firstImagePath.replace('static', '')
                if(img2) {
                    let secondImagePath = req.files['image2'][0].path
                    let secondImagePathCorrected = secondImagePath.replace('static', '')
                    query = "UPDATE projects SET projectName = ?, description1 = ?, image1path = ?, description2 = ?, image2path = ? WHERE id = ?"
                    values = [req.body['projectTitle'], req.body['firstImageDescription'], firstImagePathCorrected, req.body['secondImageDescription'], secondImagePathCorrected, req.params.id]
                }
                else {
                    query = "UPDATE projects SET projectName = ?, description1 = ?, image1path = ?, description2 = ? WHERE id = ?"
                    values = [req.body['projectTitle'], req.body['firstImageDescription'], firstImagePathCorrected, req.body['secondImageDescription'], req.params.id]
                }
            }
            else{
                if(img2){
                    let secondImagePath = req.files['image2'][0].path
                    let secondImagePathCorrected = secondImagePath.replace('static', '')
                    query = "UPDATE projects SET projectName = ?, description1 = ?, description2 = ?, image2path = ? WHERE id = ?"
                    values = [req.body['projectTitle'], req.body['firstImageDescription'], req.body['secondImageDescription'], secondImagePathCorrected, req.params.id]
                }
                else{
                    query = "UPDATE projects SET projectName = ?, description1 = ?, description2 = ? WHERE id = ?"
                    values = [req.body['projectTitle'], req.body['firstImageDescription'], req.body['secondImageDescription'], req.params.id]
                }
            }

            db.run(query, values, function (error) {
                res.redirect('/project/'+req.params.id);
            })
        })  
    })

router.route('/:feedbackId/deleteFeedback')
    .all(/*TODO add user validation*/)
    .get(function(req, res) {
    })
    .post(function(req, res) {
        // TODO: Check if the user is logged in, and only carry
	    // out the request if the user is.

        const query = "DELETE FROM projectFeedback WHERE id = ?"
        const values = [req.params.feedbackId]

        db.run(query, values, function (error) {
            res.redirect(req.headers.referer + '#feedback');
        }) 
    })

router.route('/:id/postFeedback')
    .all(/*TODO add user validation*/)
    .get(function(req, res) {
    })
    .post(function(req, res) {
        const name = req.body.name
        const feedback = req.body.feedback
        const id = req.body.id

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
            res.redirect('/project/'+id+'#feedback')
        })
    })
    
module.exports = router