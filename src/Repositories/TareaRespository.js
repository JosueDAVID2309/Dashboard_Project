const db = require('../config/database')

exports.getUserTasks = async (id, filtros = {}) => {
    let query = 'SELECT * FROM tareasInfo WHERE id_usuario = ?';
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

exports.insertTask = async (titulo, contenido, id_usuario, estado, id_categoria) =>{
    const [result] = await db.query(
    'INSERT INTO tareas (titulo, contenido, id_categoria, estado, id_usuario) VALUES (?, ?, ?, ?, ?)',
        [titulo, contenido,id_categoria, estado, id_usuario ]
    );

    return result.insertId;
}

exports.editTask = async (id, titulo, contenido, estado, categoria) => {
    const [result] = await db.query(
        'UPDATE tareas SET titulo = ?, contenido = ?, estado = ?, id_categoria = ? WHERE id = ?',
        [titulo, contenido, estado, categoria, id]
    );

    return result.affectedRows > 0;
};

exports.deleteTask = async (id) => {
    const [result] = await db.query(
        'DELETE FROM tareas WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};