const repUser = require('../Repositories/UserRepository') 
const repTarea = require('../Repositories/TareaRespository')
const User = require('../models/User')
const Task = require('../models/Task')
exports.login = async (req, res) => {
    
    const user = await repUser.buscarUser(req.body.email)
    
    req.session.UserId = user.id;
    res.redirect('/inicio')
}

exports.inicio = async (req, res) => {

    const userDB = await repUser.buscarPorId(req.session.UserId);
    const user = new User(userDB)
    const categories = await repTarea.getCategories();
    const tareasDB = await repTarea.getUserTasks(req.session.UserId);
    const tareas = tareasDB.map(t => new Task(t))
    res.render('inicio', {
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.username,
        f_nacimiento: user.fecha_nacimiento,
        correo: user.email,
        genero: user.genero === 'M' ? 'Hombre': 'Mujer',
        categorias: categories,
        tareas: tareas
    });
}

exports.registro = async (req, res) => {
    const user = await repUser.createUser(req.body.nombre, req.body.apellido, req.body.usuario,
        req.body.f_nacimiento, req.body.correo, req.body.clave, req.body.genero
    )
    req.session.UserId = user
    res.redirect('/inicio')
}

exports.logout = (req, res) => {
    req.session.destroy(function(err){
        if (err) {
            console.error(err);
            return res.status(500).send('No se pudo cerrar sesión');
        }
    })

    console.log('se cerro sesion satisfatoriamente')

    res.clearCookie('connect.sid');
    res.redirect('/');
}

