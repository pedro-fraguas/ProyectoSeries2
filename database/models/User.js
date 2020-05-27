module.exports = function (sequelize, dataTypes) {
    let alias = "User"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {type: dataTypes.STRING},
        email: {type: dataTypes.STRING},
        password: {type: dataTypes.STRING},
    }

    let config = {
        tableName: "users",
        timestamps: false,
    }

    let User = sequelize.define(alias, cols, config)

    User.associate = function(models){
        User.hasMany(models.Review, {
            as: 'review',
            foreignKey: 'user_id',
        })
    }

    return User
}