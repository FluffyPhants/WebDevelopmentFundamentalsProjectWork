const express = require('express')
const router = express.Router()
const db = require("../database")
const vd = require("../validators.js")
const mul = require("../multer.js")
const csurf = require('csurf')

router.get('/', function(req, res) {
    res.locals.tab = {
        projectsTab: true
    }

    db.selectAllProjects(function (error, projects) {
        if (error) {
            const model = {
                hasDatabaseError: true,
                projects: [],
            }
            res.render('projects.hbs', model)
        }
        else {
            const model = {
                hasDatabaseError: false,
                projects
            }
            res.render('projects.hbs', model)
        }
    })
})
router.route('/create')
    .get(vd.isLoggedIn, csurf({}), function(req, res) {
        const model = {
            csrfToken: req.csrfToken()
        }
        res.render('createProject.hbs', model)
    })
    .post(vd.isLoggedIn, function(req, res) {

    csurf({})

    const upload = mul.upload

    upload(req, res, function(err) {

        const title = req.body['projectTitle']
        const desc1 = req.body['firstImageDescription']
        const desc2 = req.body['secondImageDescription']
        let img1path
        let img2path

        let errors = []


        if (!req.files['image1']) {
            errors.push('First image was not selected');
        }else{
            img1path = req.files['image1'][0].path.replace('static', '')
        }
        if (!req.files['image2']) {
            errors.push('Second image was not selected');
        }else {
            img2path = (req.files['image2'][0].path).replace('static', '')
        }
        if (err) {
            errors.push(err);
        }

        const verro = vd.getValidationErrorsProjectText(title, desc1, desc2)
        for(const erro of verro) {
            errors.push(erro)
        }
        
        const verroimage = vd.validateImageFile(req.files['image1'], req.files['image2'])
        for(const erro of verroimage) {
            errors.push(erro)
        }

        if(errors.length == 0) {
            db.uploadProject(title, desc1, img1path, desc2, img2path, function(error) {
                if(error) {
                    const model = {
                        error
                    }
                    res.render('databaseError.hbs', error)
                }
                else{
                    res.redirect('/projects')
                }
            })
        }
        else{
            const model = {
                errors,
                title,
                desc1,
                desc2,
                csrfToken: req.body._csrf
            }
            res.render('createProject.hbs',model)
        }
    })  
})

module.exports = router