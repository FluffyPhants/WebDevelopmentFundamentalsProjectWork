const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

app.use(express.static('static'))

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs'
}))

app.get('/', function(request, response){
    response.render('home.hbs')
})

app.get('/projects', function(request, response){
    response.render('projects.hbs')
})

app.get('/about', function(request, response){
    response.render('about.hbs')
})

app.listen(8080)