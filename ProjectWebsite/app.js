const express = require('express')
const expressHandlebars = require('express-handlebars')


const projects =  [
    {
        id: 1,
        title: "project 1",
        subtitle: "Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.",
        img: "https://bulma.io/images/placeholders/1280x960.png"
    },
    {
        id: 2,
        title: "project 2",
        subtitle: "Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.",
        img: "https://bulma.io/images/placeholders/1280x960.png"
    },
    {
        id: 3,
        title: "project 3",
        subtitle: "Donec rhoncus aliquet tellus non dignissim. Fusce dictum, nisi ut fringilla consectetur, est velit ultricies nulla, sed lobortis nisi metus eu lorem. Proin malesuada faucibus metus id tristique. Pellentesque in tortor a velit porttitor aliquet.",
        img: "https://bulma.io/images/placeholders/1280x960.png"
    },
    {
        id: 4,
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
    const recentProjects = [...projects]
    recentProjects.length = 3;
    const model = {
        recentProjects
    }
    response.render('home.hbs', model)
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

app.get('/project/:id', function(request, response) {
    const id = request.params.id
    const project = projects.find((p) => p.id == id)
    const model = {
        project
    }
    response.render('project.hbs', model)
})

app.listen(8080)