let db = require('../database/models')

module.exports = {

    index: function(req, res){
        res.send('Esta es la pagina de series')
    },
    search: function(req, res){
        res.render('resultadoDeBuscador', {query: req.params.query, profile: req.session.userID})
    },
    detail: function(req, res){
        var id = req.params.id
        db.Review.findAll({
            where: {
                serie_id: id
            },
            include: [
                {association: "user", attributes: ["username"]}
            ]
        })
        .then(function(results){
            console.log(results);
            
            res.render('detalleDeSerie', {id: id, reviews: results, profile: req.session.userID})
        })
        .catch(function(error){

        })
    },
    byGenre: function(req, res){
        res.render('seriesPorGenero', {id: req.params.id, profile: req.session.userID})
    },
    advanced: function(req, res){
        res.render('buscadorAvanzado', {profile: req.session.userID})
    },
    advancedSearch: function(req, res){
        res.render('resultadosBuscadorAvanzado', {profile: req.session.userID})
    },
    favorites: function (req, res){
        res.render('seriesFavoritas', {profile: req.session.userID})
    },
    comment: function(req, res){
        db.Review.create({
            user_id: req.session.userID,
            serie_id: req.params.id,
            message: req.body.comment,
            rating: req.body.rating,
        }) 
        .then(function(response){
            res.redirect('/series/detail/' + req.params.id)
        })
    },
}