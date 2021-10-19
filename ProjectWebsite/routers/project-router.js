const express = require('express')
const router = express.Router()

const mul = require('../multer.js')

const vd = require('../validators.js')

const db = require('../database.js')

const csurf = require('csurf')

router.param('id', async function(req, res, next, id) {
    try{
        const project = await db.selectFromProjectsByID(id)
        const feedbacks = await db.selectProjectFeedbackFromProjectID(id)
        req.project = project
        req.feedback = feedbacks
    }
    catch{
        const error = "Could not load project or feedback"
        const model = {
            error
        }
        res.render('databaseError.hbs', error)
    }
    next()
})

router.route('/:id')
    .get(csurf({}), function(req, res) {
        const model = {
            project: req.project,
            feedbacks: req.feedback,
            csrfToken: req.csrfToken()
        }
        res.render('project.hbs', model)
    })

router.route('/:id/delete')
    .get(vd.isLoggedIn, csurf({}), function(req, res) {
            const model = {
                project: req.project,
                csrfToken: req.csrfToken()
            }
            res.render('deleteProject.hbs', model)
    })
    .post(vd.isLoggedIn, csurf({}), function(req, res) {
        const id = req.project.id

        db.deleteProjectById(id, function (error) {
            if(error){
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                res.redirect('/projects');
            }
        })
    })

router.route('/:id/update')
    .get(vd.isLoggedIn, csurf({}), function(req, res) {
        const model = {
            project: req.project,
            csrfToken: req.csrfToken()
        }
        res.render('updateProject.hbs', model)
    })
    .post(vd.isLoggedIn, csurf({}), function(req, res) {

        const upload = mul.upload

        upload(req, res, function(err) {

            const title = req.body['projectTitle']
            const desc1 = req.body['firstImageDescription']
            const desc2 = req.body['secondImageDescription']
            let img1path
            let img2path

            let errors = []

            if (!req.files['image1']) {
                img1path = req.project.image1path
            }
            else{
                img1path = req.files['image1'][0].path.replace('static', '')
            }
            if (!req.files['image2']) {
                img2path = req.project.image2path
            }
            else {
                img2path = (req.files['image2'][0].path).replace('static', '')
            }
            if (err) {
                errors.push(err);
            }

            const verro = vd.getValidationErrorsProjectText(title, desc1, desc2)
            for(const erro of verro) {
                errors.push(erro)
            }
            
            const verroimage = vd.validateImageFile(req.files['image1'], req.files['image2'])
            for(const erro of verroimage) {
                errors.push(erro)
            }

            if(errors.length == 0) {
                db.updateProject(title, desc1, img1path, desc2, img2path, req.params.id, function(error) {
                    if(error) {
                        const model = {
                            error
                        }
                        res.render('databaseError.hbs', error)
                    }
                    else {
                        res.redirect('/project/' + req.params.id)
                    }
                })
            }
            else{
                const model = {
                    errors,
                    project: {
                        id: req.params.id,
                        projectName: title,
                        description1: desc1,
                        image1path: img1path,
                        description2: desc2,
                        image2path: img2path
                    },
                    csrfToken: req.body._csrf
                }
                res.render('updateProject.hbs',model)
            }
        })
    })

router.route('/:feedbackId/deleteFeedback')
    .get(vd.isLoggedIn, csurf({}), function(req, res) {
        const id = req.params.feedbackId

        db.selectProjectFeedbackById(id, function(error, feedback) {
            if(error) {
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                const model = {
                    feedback: feedback[0],
                    csrfToken: req.csrfToken()
                }
                res.render('deleteFeedback.hbs', model)
            }
        })
    })
    .post(vd.isLoggedIn, csurf({}), function(req, res) {
        const id = req.params.feedbackId

        db.deleteProjectFeedbackById(id, function(error) {
            if(error) {
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                res.redirect('/project/' + req.body.projectId +'#feedback')
            }
        })
    })


router.route('/:feedbackId/updateFeedback')
    .get(vd.isLoggedIn, csurf({}), function(req, res) {
        const id = req.params.feedbackId

        db.selectProjectFeedbackById(id, function(error, feedback) {
            if(error) {
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                const model = {
                    feedback: feedback[0],
                    csrfToken: req.csrfToken()
                }
                res.render('updateFeedback.hbs', model)
            }
        })
    })
    .post(vd.isLoggedIn, csurf({}), function(req, res) {
        const id = req.params.feedbackId
        const name = req.body.name
        const feedback = req.body.feedback
        const projectId = req.body.projectId

        const errors = vd.getValidationErrorsFeedback(name, feedback)

        if(errors.length == 0) {
            db.updateProjectFeedbackById(name, feedback, id, function(error) {
                if(error) {
                    const model = {
                        error
                    }
                    res.render('databaseError.hbs', error)
                }
                else {
                    res.redirect('/project/' + req.body.projectId +'#feedback')
                }
            })
        }
        else {
            const model = {
                errors,
                feedback: {
                    id,
                    name,
                    feedback,
                    projectId
                },
                csrfToken: req.body._csrf
            }
            res.render('updateFeedback.hbs', model)
        } 
    })

router.route('/:id/postFeedback')
    .post(csurf({}), function(req, res) {
        const name = req.body.name
        const feedback = req.body.feedback
        const projectId = req.body.projectId

        const errors = vd.getValidationErrorsFeedback(name, feedback)

        if(errors.length == 0) {
            db.postProjectFeedback(name, feedback, projectId, function(error) {
                if(error) {
                    const model = {
                        error
                    }
                    res.render('databaseError.hbs', error)
                }
                else {
                    res.redirect('/project/'+projectId+'#feedback')
                }
            })
        }
        else {
            const model = {
                errors,
                name,
                feedback,
                projectId,
                csrfToken: req.body._csrf
            }
            res.render('createFeedback.hbs', model)
        }
    })
    
module.exports = router