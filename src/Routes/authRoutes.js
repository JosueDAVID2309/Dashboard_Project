const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/login', (req, res) =>{
    res.render('login',{
        error: null
    })
})

router.get('/registro', (req, res) =>{
    res.render('registro')
})

module.exports = router;