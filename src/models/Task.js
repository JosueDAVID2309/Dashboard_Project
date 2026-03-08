class Task {
    constructor(data){
        this.id = data.id
        this.titulo = data.titulo
        this.contenido = data.contenido
        this.categoria = data.categoria
        this.estado = data.estado
        this.id_usuario = data.id_usuario
        this.created_at = this.getFechaNacimientoFormateada(data.created_at)
        this.updated_at = this.getFechaNacimientoFormateada(data.updated_at)

    }

    getFechaNacimientoFormateada(fecha){
        const date = new Date(fecha);

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // enero = 0
        const año = date.getFullYear();

        return `${dia}/${mes}/${año}`;
    }
}

module.exports = Task