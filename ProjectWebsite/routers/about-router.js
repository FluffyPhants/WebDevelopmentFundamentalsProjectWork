const { response } = require('express')
const express = require('express')
const router = express.Router()
const db = require("../database")

router.get('/', function(req, res) {
    res.locals = {
        aboutTab: true
    }

    db.selectAllAmaQuestions(function(error, questions) {
        if (error) {
            const model = {
                hasDatabaseError: true,
                questions: []
            }
            res.render('about.hbs', model)
        }
        else {
            const model = {
                hasDatabaseError: false,
                questions
            }
            res.render('about.hbs', model)
        }
    })
})

router.post('/post', function(req, res) {
    const name = req.body.name
    const question = req.body.question

    // TODO: Add validation and display error messages.

    db.postAmaQuestion(name, question, function(error) {
        if(error) {
            //TODO
        }
        else {
            response.redirect(req.headers.referer+"#AMA")
        }
    })
})

router.post('/deleteQuestion/:id', function(req, res) {
    // TODO: Check if the user is logged in, and only carry
    // out the request if the user is.
    const id = [req.params.id]

    db.deleteAmaQuestionById(id, function(error){
        if(error) {
            //TODO
        }
        else {
            response.redirect(req.headers.referer+"#AMA")
        }
    }) 
})

module.exports = router