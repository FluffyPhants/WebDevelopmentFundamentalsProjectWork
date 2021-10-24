const express = require('express')
const router = express.Router()
const db = require('../database')
const vd = require('../validators.js')
const csurf = require('csurf')

router.get('/', csurf({}), function(req, res) {
    res.locals.tab = {
        aboutTab: true
    }

    let model = {}

    db.selectAllAmaQuestions(function(error, questions) {
        if(error){
            model = {
                hasDatabaseError: true,
                questions: [],
                csrfToken: req.csrfToken()
            }
        }
        else {
            model = {
                hasDatabaseError: false,
                questions,
                csrfToken: req.csrfToken()
            }
        }
        res.render('about.hbs', model)
    })
})

router.post('/post', csurf({}), function(req, res) {
    const name = req.body.name
    const question = req.body.question

    const errors = vd.getValidationErrorsQuestion(name, question)

    if(errors.length == 0) {
        db.postAmaQuestion(name, question, function(error) {
            if(error) {
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                res.redirect("/about#AMA")
            }
        })
    }
    else {
        const model = {
            errors,
            name,
            question,
            csrfToken: req.csrfToken()
        }
        res.render('createQuestion.hbs', model)
    }
})

router.route('/:id/delete')
    .get(vd.isLoggedIn,csurf({}), function(req, res) {
        const id = req.params.id

        db.selectAmaQuestionById(id, function(error, question) {
            if(error) {
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                const model = {
                    hasDatabaseError: false,
                    question: question[0],
                    csrfToken: req.csrfToken()
                }
                res.render('deleteQuestion.hbs', model)
            }
        })
    })
    .post(vd.isLoggedIn, csurf({}), function(req, res) {
        const id = req.params.id
    
        db.deleteAmaQuestionById(id, function(error){
            if(error) {
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                res.redirect("/about#AMA")
            }
        }) 
    })

    router.route('/:id/update')
    .get(vd.isLoggedIn, csurf({}), function(req, res) {
        const id = req.params.id

        db.selectAmaQuestionById(id, function(error, question) {
            if(error) {
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                const model = {
                    hasDatabaseError: false,
                    question: question[0],
                    csrfToken: req.csrfToken()
                }
                res.render('updateQuestion.hbs', model)
            }
        })
    })
    .post(vd.isLoggedIn, csurf({}), function(req, res) {
        const id = req.params.id
        const name = req.body.name
        const question = req.body.question
    
        db.updateAmaQuestionById(name, question, id, function(error){
            if(error) {
                const model = {
                    error
                }
                res.render('databaseError.hbs', error)
            }
            else {
                res.redirect("/about#AMA")
            }
        }) 
    })

module.exports = router