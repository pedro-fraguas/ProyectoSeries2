let db = require('../database/models')

module.exports = {

    index: function(req, res){
        res.send('Esta es la pagina de series')
    },
    search: function(req, res){
      res.render('resultadoDeBuscador', {query: req.params.query})
    },
    detail: function(req, res){
        var id = req.params.id
        db.Review.findAll({
            where: {
                serie_id: id
            },
            include: [
                {association: "user"}
            ]
        })
        .then(function(results){
            console.log(results);
            
            res.render('detalleDeSerie', {id: id, reviews: results})
        })
        .catch(function(error){

        })
    },
    byGenre: function(req, res){
        res.render('seriesPorGenero', {id: req.params.id})
    },
    advanced: function(req, res){
        res.render('buscadorAvanzado')
    },
    advancedSearch: function(req, res){
        res.render('resultadosBuscadorAvanzado')
    },
    favorites: function (req, res){
        // res.render('seriesFavoritas')
    },
    comment: function(req, res){
        db.Review.create({
            user_id: req.session.userID,
            serie_id: req.params.id,
            message: req.body.comment,
            rating: req.body.rating,
        }) 
    },
}