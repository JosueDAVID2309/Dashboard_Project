const repUser = require('../Repositories/UserRepository') 
const repTarea = require('../Repositories/TareaRespository')
const User = require('../models/User')
const Task = require('../models/Task')

exports.crear = async(req, res) =>{
    await repTarea.insertTask(req.body.titulo, req.body.contenido, req.session.UserId, 0, req.body.categoria)
    res.redirect('/inicio')
}

exports.editar = async(req, res) => {
    const idTask = req.params.id 
    await repTarea.editTask(idTask, req.body.titulo, req.body.contenido, 0, req.body.categoria)
    res.redirect('/inicio')
}

exports.eliminar = async(req, res) => {
    const idTask = req.params.id
    await repTarea.deleteTask(idTask)
    res.redirect('/inicio')
}