const userRep = require('../Repositories/UserRepository')

exports.autenticarUser = async (req, res, next) => {
    try {
        const user = await userRep.verificarUser(
            req.body.email,
            req.body.clave
        );

        if (!user) 
            return res.render('login', {
                error: 'Correo u contraseña incorrectas'
            });
        
        next();

    } catch (error) {
        next(error);
    }
};

exports.verificarSesion = (req, res, next) => {
    
    if (!req.session.UserId)
        return res.redirect('/login');
    
    next();
}