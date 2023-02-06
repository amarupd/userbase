const db = require("../models")
const addUser = db.registrations;
const loginU = db.logins;
// const sequelize = require('../sequelizetemplate')


// const { QueryTypes } = require('sequelize');



/********************************************************************************************** */
const adduser = async (req, res) => {

    let info = {
        fullname: req.body.fullname,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        userID: req.body.userID,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    }
    let login = {
        userID: req.body.userID,
        password: req.body.password,
        timeStamp: req.body.timeStamp
    }
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if (password == confirm_password) {
        const emp = await addUser.create(info)
        res.status(200).send(emp)
        const log = await loginU.create(login)
    }
}


const details = async (req, res) => {
    let times = await addUser.findAll({})
    res.status(200).send(times)
}




module.exports = {
    adduser,
    details

}