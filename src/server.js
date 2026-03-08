require('dotenv').config()
require('ejs')

const session = require('express-session')
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const app = express()

//Rutas
const authRoutes = require('./Routes/authRoutes')
const taskRoutes = require('./Routes/taskRoutes')

//Express settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure:false
    }
}))

//Impotas rutas
// app.use(Routes)
app.use(authRoutes)
app.use(taskRoutes)

app.listen(3000, () => {
    console.log('servidor en el puerto 3000')
})