// let db = require('../database/models')
// const op = db.Sequelize.Op

module.exports = {
    index: function(req, res){
        res.render('prueba')
    },
    search: function(req, res){
        res.render('resultadoDeBuscador')
    },
    detail: function(req, res){
        res.render('detalleDeSerie')
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
        //  db.Serie.findByPk(req.params.id, {
        //      include: [{association: 'genre'}]
        // })
        //     .then(function(series){
        //         return res.render('seriesDetail', {series: series})
        //     })
    // },
    // byGenre: function(req, res){
        // db.Serie.findAll({ 
        //     where: {
        //         genre_id: req.params.genre_id
        //     }
        // })
        //     .then(function(series){
        //         return res.render('seriesList', {series: series})
        //     })
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
        // var data = new URLSearchParams(location.search);
        // var query = data.get("query");
        // db.Serie.findAll({
        //     where: [{
        //         title: {[op.like]: "%" + query + "%"} //REVISAR
        //     }]
        // })
        // .then(function(series){
        //     res.render('seriesList', {series: series})
        // })
    // }
}