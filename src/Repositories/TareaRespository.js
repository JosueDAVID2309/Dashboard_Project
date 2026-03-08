const db = require('../config/database')

exports.getUserTasks = async (id, filtros = {}) => {
    let query = 'SELECT * FROM tareas WHERE id_usuario = ?';
    const parametros = []
    parametros.push(id)

    if (filtros.estado){
        query += 'AND estado = ? ';
        parametros.push(filtros.estado)
    }

    if (filtros.categoria){
        query += 'AND id_categoria = ? ';
        parametros.push(filtros.categoria)
    }

    const [rows] = await db.query(query, parametros)
    return rows || null;

}

exports.getCategories = async () =>{
    const [rows] = await db.query('SELECT * FROM categorias')

    return rows || null;
}