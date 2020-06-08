let loginModule = require('../modulo-login')
let db = require('../database/models')

module.exports = {
    index: function(req, res){
        res.send('Usuario iniciado: ' + req.session.userID)
    },
    id: function(req, res){
        let user = db.User.findOne({
            where: {
                id: req.session.userID
            }
        })
        let reviews = db.Review.findAll({
            where: {
                user_id: session.userID
            }
        })
        Promise.all([user, reviews])
        .then(function(req, res){
            res.render('perfilUsuario', {user: user, reviews: reviews})
        })
    },
    register: function(req, res){
        res.render('registrarUsuario', {error: ""})
    },
    submit: function(req, res){
        // console.log(loginModule.checkUserName(req.body.username))
        // console.log(req.body.username);
        
        if (loginModule.checkUserName(req.body.username)) {
            res.render('registrarUsuario', {error: "El nombre de usuario ya existe"})
        } else if (loginModule.checkUserEmail(req.body.email)) {
            res.render('registrarUsuario', {error: "El email ya esta registrado"})
        } else {
            db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })
            res.redirect('/')
        }
    },
    log: function(req, res){
        res.render('loginUsuario', {error: ""})
    },
    login: function(req, res){
        loginModule.validate(req.body.username, req.body.password)
        .then(function(validate){
            if (validate != null){
                req.session.username = req.body.username
                res.send(req.sessions.username)
            } else {
                res.render('loginUsuario', {error: "El usuario o la contraseña son incorrectos"})
            }
        })
    },
    logout: function(req,res){
        req.session.userID = ""
        res.redirect('/users/login')
    },
    editReview: function(req, res){
        // Update review
    }
}