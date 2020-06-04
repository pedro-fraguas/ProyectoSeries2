let db = require('../database/models')
//let loginModule = require('../modulo-login')
// const op = db.Sequelize.Op

module.exports = {
    index: function(req, res){
        res.send('Esta es la pagina de series')
    },
    search: function(req, res){
        res.render('resultadoDeBuscador')
    },
    detail: function(req, res){
        var id = req.params.id
        db.Review.findAll({
            where: {
                serie_id: id
            }
        })
        .then(function(reviews){
            res.render('detalleDeSerie', {id: id, reviews: reviews})
        })
        
    },
    byGenre: function(req, res){
        res.render('seriesPorGenero')
    },
    advancedSearch: function(req, res){
        res.render('buscadorAvanzado')
    },
    favorites: function (req, res){
        res.render('seriesFavoritas')
    },
    comment: function(req, res){
        db.User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password,
            }
        })
        .then(function(results){
            if (results != null){
                db.Review.create({
                    user_id: results.id,
                    serie_id: req.body.id,
                    message: req.body.comment,
                    // rating: '',
                })
                return res.redirect() //completar
            } else {
                // incorrect username or password
            }
        })
        
    },
    // create: function (req, res){
    //     db.Genre.findAll()
    //         .then(function(genres){
    //             return res.render('seriesCreate', {genres: genres})
    //         })
    // },
    // save: function (req, res){
    //     db.Serie.create({
    //         title: req.body.title,
    //         genre_id: req.body.genre,
    //         release_date: req.body.release_date,
    //     })
    //     res.redirect("/series")
    // },
    // list: function(req, res){
    //     db.Serie.findAll()
    //         .then(function(series){
    //             return res.render('seriesList', {series: series})
    //         })
    // },
    // detail: function(req, res){
    //      db.Serie.findByPk(req.params.id, {
    //          include: [{association: 'genre'}]
    //     })
    //         .then(function(series){
    //             return res.render('seriesDetail', {series: series})
    //         })
    // },
    // byGenre: function(req, res){
    //     db.Serie.findAll({ 
    //         where: {
    //             genre_id: req.params.genre_id
    //         }
    //     })
    //         .then(function(series){
    //             return res.render('seriesList', {series: series})
    //         })
    // },
    // edit: function(req, res){
    //     let serieRequest = db.Serie.findByPk(req.params.id)
    //     let genresRequest = db.Genre.findAll()

    //     Promise.all([serieRequest, genresRequest])
    //         .then(function([serie, genres]){
    //             res.render('seriesEdit', {serie:serie, genres:genres})
    //         })
    // },
    // update: function(req, res){
    //     db.Serie.update({
    //         title: req.body.title,
    //         genre_id: req.body.genre,
    //         release_date: req.body.release_date,
    //     }, {
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //     res.redirect("/series/" + req.params.id)
    // },
    // delete: function(req, res){
    //     db.Serie.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //     res.redirect('/series')
    // },
    // search: function(req, res){
    //     var data = new URLSearchParams(location.search);
    //     var query = data.get("query");
    //     db.Serie.findAll({
    //         where: [{
    //             title: {[op.like]: "%" + query + "%"} //REVISAR
    //         }]
    //     })
    //     .then(function(series){
    //         res.render('seriesList', {series: series})
    //     })
    // }
}