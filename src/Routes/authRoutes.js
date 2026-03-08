const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController')
const authUser = require('../Middlewares/authUser')

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/registro', (req, res) =>{
    res.render('registro')
})

router.get('/login', (req, res) =>{
    res.render('login',{ error: null })
})

router.post('/registro', AuthController.registro)

router.post('/login',authUser.autenticarUser ,AuthController.login)

router.get('/inicio', authUser.verificarSesion, AuthController.inicio)

router.get('/logout', AuthController.logout)

module.exports = router;