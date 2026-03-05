const db = require('../config/database')

exports.test = async () => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = 2')

    return rows[0] || null;
}