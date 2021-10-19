//delete of projects or ama questions does not work

const express = require('express')
const expressHandlebars = require('express-handlebars')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')
const expressSession = require('express-session')

//const cdb = require('./createDatabase')

const connectSqlite3 = require('connect-sqlite3')
const SQLiteStore = connectSqlite3(expressSession)

const app = express()

app.use(express.static(__dirname + '/static'))

app.use(express.urlencoded({
    extended: false
}))

app.use(expressSession({
	store: new SQLiteStore({db: "session-db.db"}),
	secret: "asdsasdadsasdasdasds",
	saveUninitialized: false,
	resave: false,
}))

app.use(function(req, res, next) {
	//Make the session available to all the views
	res.locals.session = req.session
	next()
})

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs'
}))

db.run("PRAGMA foreign_keys = ON");

//Routers ###################################################
const loginrouter = require('./routers/login-router.js')
app.use('/login', loginrouter)

const homerouter = require('./routers/home-router.js')
app.use('/', homerouter)

const projectsrouter = require('./routers/projects-router.js')
app.use('/projects', projectsrouter)

const projectrouter = require('./routers/project-router.js')
app.use('/project', projectrouter)

const aboutrouter = require('./routers/about-router.js')
app.use('/about', aboutrouter)
//###########################################################

app.listen(8080)




