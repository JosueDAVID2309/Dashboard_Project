const express = require('express');
const router = express.Router();
const authUser = require('../Middlewares/authUser')
const TaskController = require('../Controllers/TaskController')

router.post('/tarea/crear',authUser.verificarSesion, TaskController.crear)

router.post('/tarea/editar/:id', authUser.verificarSesion, TaskController.editar)

router.post('/tarea/delete/:id', authUser.verificarSesion, TaskController.eliminar)
module.exports = router;