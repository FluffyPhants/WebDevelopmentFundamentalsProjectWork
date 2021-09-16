const express = require('express')
const expressHandlebars = require('express-handlebars')


const projects =  [
    {
        title: "project 1",
        subtitle: "Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.",
        img: "https://bulma.io/images/placeholders/1280x960.png"
    },
    {
        title: "project 2",
        subtitle: "Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.",
        img: "https://bulma.io/images/placeholders/1280x960.png"
    },
    {
        title: "project 3",
        subtitle: "Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.",
        img: "https://bulma.io/images/placeholders/1280x960.png"
    },
    {
        title: "project 4",
        subtitle: "Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.",
        img: "https://bulma.io/images/placeholders/1280x960.png"
    }

]

const app = express()

app.use(express.static('static'))

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs'
}))

app.get('/', function(request, response){
    response.render('home.hbs')
})

app.get('/projects', function(request, response){
    const model = {
        projects
    }
    response.render('projects.hbs', model)
})

app.get('/about', function(request, response){
    response.render('about.hbs')
})

app.listen(8080)