const express = require('express')
const expressHandlebars = require('express-handlebars')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')
const { response } = require('express')

const app = express()

app.use(express.static(__dirname + '/static'))

app.use(express.urlencoded({
    extended: false
}))

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs'
}))

db.run("PRAGMA foreign_keys = ON");

//Routers ###################################################
const projectsrouter = require('./projects-router.js')
app.use('/projects', projectsrouter)

const projectrouter = require('./project-router.js')
app.use('/project', projectrouter)

const aboutrouter = require('./about-router.js')
app.use('/about', aboutrouter)
//###########################################################

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

app.listen(8080)




