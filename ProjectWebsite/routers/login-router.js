const express = require('express')
const router = express.Router()

const vd = require('../validators.js')

const csurf = require('csurf')

const bcrypt = require('bcrypt');

const ADMIN_USERNAME = '$2b$10$QBH.2P2KhWMa4TvcNCtghesFPdSKhp4Xwm4LmtzB5FoRUrM4gZhxO'
const ADMIN_PASSWORD = '$2b$10$We21npbWq5jcp2DFc0Gn8uPIFPQvUGPBOoN3n5VXXwZZnfuzusTNW'

router.route('/')
    .get(csurf({}), function(req, res) {
        const model = {
            csrfToken: req.csrfToken()
        }
        res.render('login.hbs', model)
    })
    .post(csurf({}), async function(req, res) {
        const username = req.body.username
	    const password = req.body.password

        //TODO add validation

        const validUsername = await bcrypt.compare(username, ADMIN_USERNAME)
        const validPassword = await bcrypt.compare(password, ADMIN_PASSWORD)

        const errors = vd.validateLogin(validUsername, validPassword)

        if(errors.length == 0){
            req.session.isLoggedIn = true
            // TODO: Do something better than redirecting to start page.
            res.redirect('/')
        }else{
            const model = {
                errors,
                csrfToken: req.body._csrf
            }
            res.render('login.hbs', model)
        }
    })

router.post('/logout', function(req, res) {
    req.session.isLoggedIn = false
    res.redirect('/')
})


module.exports = router