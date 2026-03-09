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

exports.dashboard = async (req, res) => {
    const metrics = await repTarea.getMetrics(req.session.UserId);
    const ultimaTarea = await repTarea.ultimaTarea(req.session.UserId)
    const ultimaActulizada = await repTarea.ultimaActualizada(req.session.UserId)
    
    const dataCake = await repTarea.getCakeData(req.session.UserId)
    const categorias = dataCake.map(c => c.categoria);
    const totales = dataCake.map(c => c.totalTareas);

    const dataBar = await repTarea.getBarData(req.session.UserId)
    const labels = dataBar.map(row => row.categoria);
    const completadas = dataBar.map(row => row.completadas);
    const pendientes = dataBar.map(row => row.pendientes);

    res.render('dashboard',{
        total_tareas: metrics.total_tareas,
        tareas_completadas: metrics.tareas_completadas,
        tareas_pendientes: metrics.tareas_pendientes,
        ultimaTareaTitle: ultimaTarea.titulo,
        ultimaTareaFecha: Task.getFechaHora(ultimaTarea.created_at),
        ultimaActualizadaTitle: ultimaActulizada.titulo,
        ultimaActualizadaFecha: Task.getFechaHora(ultimaActulizada.updated_at),
        categorias: categorias,
        totales: totales,
        labels: labels,
        completadas: completadas,
        pendientes: pendientes
    })
}