let db = require('./database/models')

let moduloLogin = {
    checkUserName: function (username) {
        return db.User.findOne({
            where: {
                username: username
            }
        })
        .then(function(user) {
            return user != null;
        })
    },
    checkUserEmail: function (email) {
        return db.User.findOne({
            where: {
                email: email
            }
        })
        .then(function(user) {
            return user != null;
        })
    },

    findByEmail: function (email){
        return db.User.findOne({
            where: {
                email:email
            }
        })
        .then(resultado=> {
            return resultado
        })
    },

    validate: function (email, password) {
        return db.User.findOne({
            where:{
                email:email,
                password: password,
            },
        })
        .then(results=>{
            return results;
        })
    }
}


module.exports = moduloLogin;