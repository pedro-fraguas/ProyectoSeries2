let db = require('../database/models')

module.exports = {
    index: function(req, res){
        res.send('Esta es la pagina de GENEROS')
    },
    list: function(req, res){
        db.Genre.findAll()
            .then(function(genres){
                return res.render('genresList', {genres: genres})
            })
    }
    
}