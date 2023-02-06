module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define("registrations", {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        mobile_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirm_password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    return Registration;
}
