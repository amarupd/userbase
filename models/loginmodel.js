module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("logins", {
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        timeStamp: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: new Date()
        }
    }, {
        timestamps: false
    })
    return Login;
}
