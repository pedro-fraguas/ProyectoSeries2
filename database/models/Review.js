module.exports = function (sequelize, dataTypes) {
    let alias = "Review"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {type: dataTypes.INTEGER},
        serie_id: {type: dataTypes.INTEGER},
        message: {type: dataTypes.STRING},
        rating: {type: dataTypes.INTEGER},
    }

    let config = {
        tableName: "reviews",
        timestamps: false,
    }

    let Review = sequelize.define(alias, cols, config)

    Review.associate = function(models){
        Review.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id',
        })
    }

    return Review
}