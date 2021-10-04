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
const projects = require('./projects.js')
app.use('/projects', projects)

const project = require('./project.js')
app.use('/project', project)

const about = require('./about.js')
app.use('/about', about)
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




