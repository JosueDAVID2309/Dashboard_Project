const repUser = require('../Repositories/UserRepository') 
const repTarea = require('../Repositories/TareaRespository')
exports.login = async (req, res) => {
    
    const user = await repUser.buscarUser(req.body.email)
    req.session.UserId = user.id;
    res.redirect('/inicio')
}

exports.inicio = async (req, res) => {

    const user = await repUser.buscarPorId(req.session.UserId);
    const categories = await repTarea.getCategories();
    const tareas = await repTarea.getUserTasks(req.session.UserId);

    res.render('inicio', {
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.username,
        f_nacimiento: user.f_nacimiento,
        correo: user.email,
        genero: user.genero === 'M' ? 'Hombre': 'Mujer',
        categorias: categories,
        tareas: tareas
    });

}

