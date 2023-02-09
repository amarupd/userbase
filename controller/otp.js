const db = require("../models")
const addUser = db.otps;
const sequelize = require('../sequelizetempelate')


const { QueryTypes } = require('sequelize');

const details = async (req, res) => {
    let times = await loginUser.findAll({})
    res.status(200).send(times)
}

const addotp = async (req, res) => {
    let info={
        otp : req.body.otp,
        hashCode : req.body.hashCode
    }

}

module.exports = {
    details,
    addotp
}