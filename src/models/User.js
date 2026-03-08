class User {
    constructor(data){
        this.id = data.id
        this.nombre = data.nombre
        this.apellido = data.apellido
        this.email = data.email
        this.username = data.username
        this.fecha_nacimiento = this.getFechaNacimientoFormateada(data.f_nacimiento)
        this.email = data.email
        this.genero = data.genero 
    }

    getFechaNacimientoFormateada(fecha){
        const date = new Date(fecha);

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // enero = 0
        const año = date.getFullYear();

        return `${dia}/${mes}/${año}`;
    }
}
module.exports = User