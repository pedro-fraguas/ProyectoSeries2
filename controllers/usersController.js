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
        // .then(function(){
        //     res.render('perfilUsuario', {user: user, reviews: reviews})
        // })
    },
    register: function(req, res){
        res.render('registrarUsuario', {error: ""})
    },
    submit: function(req, res){

        var checkUsername = loginModule.checkUserName(req.body.username)
        var checkEmail = loginModule.checkUserEmail(req.body.email)
        

        Promise.all([checkUsername, checkEmail])
        .then(function(checkUsername, checkEmail){

            console.log(checkUsername);
            console.log(checkEmail);
            
            if (checkUsername[0]) {
                res.render('registrarUsuario', {error: "El nombre de usuario ya existe"})
            } else if (checkEmail[0]) {
                res.render('registrarUsuario', {error: "El email ya esta registrado"})
            } else {
                db.User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                })
                req.session.username = req.body.username
                res.redirect('/')
            }
        })
        
        
    },
    log: function(req, res){
        res.render('loginUsuario', {error: ""})
    },
    login: function(req, res){
        loginModule.validate(req.body.username, req.body.password)
        .then(function(validate){
            if (validate){
                req.session.username = req.body.username
                res.redirect('/')
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