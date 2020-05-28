let loginModule = require('../modulo-login')
let db = require('../database/models')

module.exports = {
    index: function(req, res){
        res.send('Esta es la pagina de USUARIOS')
    },
    id: function(req, res){
        res.send('Este es el perfil del usuario #' + req.params.ID)
    },
    register: function(req, res){
        res.send('Registrar usuario')
    },
    submit: function(req, res){
        if (loginModule.checkUserName(req.params.username)) {
            //Ya existe ese username
        } else if (loginModule.checkUserEmail(req.params.email)) {
            //Ya existe un usuario con ese mail
        } else {
            db.User.create({
                username: req.params.username,
                email: req.params.email,
                password: req.params.password,
            })
            res.redirect('/series')
        }
    },
}