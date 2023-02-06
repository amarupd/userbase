module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("logins", {
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timeStamp: {
            type: DataTypes.DATETIME,
            allowNull: true,
            defaultValue: new Date()
        }
    }, {
        timestamps: false
    })
    return Login;
}
