module.exports = (sequelize, DataTypes) => {
    const Otp = sequelize.define("otps", {
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hashCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false
    })
    return Otp;
}
