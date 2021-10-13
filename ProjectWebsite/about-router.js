const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')

router.get('/', function(req, res) {
    res.locals = {
        aboutTab: true
    }

    db.all("SELECT * FROM amaQuestions ORDER BY id DESC", function (error, questions) {
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

    const query = "INSERT INTO amaQuestions (name, question) VALUES (?, ?)"
    const values = [name, question]

    db.run(query, values, function (error) {
        res.redirect('/about#AMA')
    })
})

router.post('/deleteQuestion/:id', function(req, res) {
    console.log("this")
    // TODO: Check if the user is logged in, and only carry
    // out the request if the user is.

    const query = "DELETE FROM amaQuestions WHERE id = ?"
    const values = [req.params.id]

    db.run(query, values, function (error) {
        res.redirect(req.headers.referer);
    }) 
})

module.exports = router