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
const homerouter = require("./routers/home-router.js")
app.use("/", homerouter)

const projectsrouter = require('./routers/projects-router.js')
app.use('/projects', projectsrouter)

const projectrouter = require('./routers/project-router.js')
app.use('/project', projectrouter)

const aboutrouter = require('./routers/about-router.js')
app.use('/about', aboutrouter)
//###########################################################

app.listen(8080)




