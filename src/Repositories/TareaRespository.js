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

exports.getMetrics = async (id) => {
    const [rows] = await db.query(
        'SELECT COUNT(*) AS total_tareas, SUM(estado = 1) AS tareas_completadas, SUM(estado = 0) AS tareas_pendientes FROM tareas WHERE id_usuario = ?', [id]
    )
    return rows[0];
}


exports.ultimaTarea = async (id) =>{
    const [rows] = await db.query(
        'SELECT id, titulo, created_at FROM tareas WHERE id_usuario = ? ORDER BY created_at DESC LIMIT 1', [id]
    )
    return rows[0];
}

exports.ultimaActualizada = async (id) =>{
    const [rows] = await db.query(
        'SELECT id, titulo, updated_at FROM tareas WHERE id_usuario = ? ORDER BY updated_at DESC LIMIT 1', [id]
    )
    return rows[0];
}

exports.getCakeData = async (userId) => {
    const [rows] = await db.query(`SELECT c.nombre AS categoria, COUNT(*) AS totalTareas FROM tareas t JOIN categorias c ON t.id_categoria = c.id WHERE t.id_usuario = ? GROUP BY c.id, c.nombre`,
        [userId]
    )   
    return rows;
};

exports.getBarData = async (userId) => {
    const [rows] = await db.query(`SELECT 
    c.nombre AS categoria,
    SUM(t.estado = 1) AS completadas,
    SUM(t.estado = 0) AS pendientes
    FROM tareas t
    JOIN categorias c ON t.id_categoria = c.id
    WHERE t.id_usuario = ?
    GROUP BY c.id, c.nombre;`,
        [userId]
    )   
    return rows;
};