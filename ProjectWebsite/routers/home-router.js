const express = require('express')
const router = express.Router()
const db = require("../database")

router.get('/', function (req, res) {
    res.locals = {
        homeTab: true
    }

    db.selectLastThreeProjects(function (error, projects) {
        if (error) {
            const model = {
                hasDatabaseError: true,
                projects: []
            }
            res.render('home.hbs', model)
        }
        else {
            const model = {
                hasDatabaseError: false,
                projects
            }
            res.render('home.hbs', model)
        }
    })
})

module.exports = router