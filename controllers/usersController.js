let loginModule = require('../modulo-login')
let db = require('../database/models')

module.exports = {
    index: function(req, res){
        res.send('Usuario iniciado: ' + req.session.username)
    },
    id: function(req, res){
        db.User.findOne({
            where: {
                username: req.session.username
            },
            include: [
                {association: "review"}
            ]
        })
        .then(function(user){
            res.render('perfilUsuario', {user: user, profile: req.session.userID})
        })
        
    },
    register: function(req, res){
        res.render('registrarUsuario', {error: "", profile: req.session.userID})
    },
    submit: function(req, res){

        var checkUsername = loginModule.checkUserName(req.body.username)
        var checkEmail = loginModule.checkUserEmail(req.body.email)
        

        Promise.all([checkUsername, checkEmail])
        .then(function([checkUsername, checkEmail]){

            console.log(checkUsername);
            console.log(checkEmail);
            
            if (checkUsername[0]) {
                res.render('registrarUsuario', {error: "El nombre de usuario ya existe", profile: req.session.userID})
            } else if (checkEmail[0]) {
                res.render('registrarUsuario', {error: "El email ya esta registrado", profile: req.session.userID})
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
        res.render('loginUsuario', {error: "", profile: req.session.userID})
    },
    login: function(req, res){
        loginModule.validate(req.body.username, req.body.password)
        .then(function(validate){
            if (validate){
                req.session.username = req.body.username
                res.redirect('/')
            } else {
                res.render('loginUsuario', {error: "El usuario o la contraseña son incorrectos", profile: req.session.userID})
            }
        })
    },
    logout: function(req,res){
        req.session.userID = ""
        res.redirect('/users/login')
    },
    editReview: function(req, res){
        db.Review.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(review){
            res.render('editarReview', {review: review, profile: req.session.userID})
        })
    },
    updateReview: function(req, res){
        db.Review.update({
            user_id: req.session.userID,
            message: req.body.comment,
            rating: req.body.rating,
            serie_id: req.body.serie_id
        }, {
            where: {id: req.params.id}
        })
        .then(function(response){
            res.redirect('/users/profile')
        })
    }
}