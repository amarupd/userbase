const db = require("../models")
const addOtp = db.otps;
// const sequelize = require('../sequelizetempelate')


// const { QueryTypes } = require('sequelize');

const details = async (req, res) => {
    let times = await addOtp.findAll({})
    res.status(200).send(times)
}

const addotp = async (req, res) => {
    let info={
        otp : req.body.otp,
        hashCode : req.body.hashCode
    }
 const otp=await addOtp.create(info)
 res.status(200).send({message:'otp added succesfully',data:otp})
}

module.exports = {
    details,
    addotp
}