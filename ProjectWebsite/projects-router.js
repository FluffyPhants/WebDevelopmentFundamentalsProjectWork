const express = require('express')
const router = express.Router()
const multer = require('multer')
const helpers = require('./helpers')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('sebastian.db')
const path = require('path')

//https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
const storage = multer.diskStorage({
    //define storage location for out images
    destination: function(req, file, cb) {
        cb(null, 'static/uploads/');
    },
    //add back date and fileextension to our image
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

router.get('/', function(req, res) {
    res.locals = {
        projectsTab: true
    }

    db.all("SELECT * FROM projects ORDER BY id DESC", function (error, projects) {
        if (error) {
            const model = {
                hasDatabaseError: true,
                projects: []
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

const upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1}]);
router.route('/create')
    .all()
    .get(function(req, res) {
        res.render('createProject.hbs')
    })
    .post(function(req, res) {
        // 'image-1' and 'image-2' is the names of our file input fields in the HTML form

        // req.files contains information of uploaded files
        // req.body contains information of text fields, if there were any
        upload(req, res, function(err) {

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.files['image1']) {
                return res.send('Please select a first image to upload');
            }
            else if (!req.files['image2']) {
                return res.send('Please select a second image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            let firstImagePath = req.files['image1'][0].path
            console.log(firstImagePath)
            let firstImagePathCorrected = firstImagePath.replace('static', '')
            console.log(firstImagePathCorrected)
            let secondImagePath = req.files['image2'][0].path
            let secondImagePathCorrected = secondImagePath.replace('static', '')

            const query = "INSERT INTO projects (projectName, description1, image1path, description2, image2path) VALUES (?, ?, ?, ?, ?)"
            const values = [req.body['projectTitle'], req.body['firstImageDescription'], firstImagePathCorrected, req.body['secondImageDescription'], secondImagePathCorrected]

            db.run(query, values, function (error) {
                res.redirect('/projects');
            })
        })  
    })

module.exports = router