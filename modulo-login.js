let db = require('./database/models')

let moduloLogin = {
    checkUserName: function (username) {
        return db.User.findOne({
            where: {
                username: username
            }
        })
        .then(function(user) {
            if (Number.isInteger(user.id)){
                return true
            } else {
                return false
            }
        })
    },
    checkUserEmail: function (email) {
        return db.User.findOne({
            where: {
                email: email
            }
        })
        .then(function(user) {
            if (Number.isInteger(user.id)){
                return true
            } else {
                return false
            }
        })
    },

    validate: function (username, password) {
        return db.User.findOne({
            where:{
                username: username,
                password: password,
            },
        })
        .then(results=>{
            return results;
        })
    }
}


module.exports = moduloLogin;