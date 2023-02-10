const db = require("../models")
const addUser = db.registrations;
// const loginUser = db.logins;
const { validateSignup } = require('../validator')
const loginU = db.logins;
const bcrypt = require('bcryptjs')
// const Joi = require('joi')
// const sequelize = require('../sequelizetempelate')


// const { QueryTypes } = require('sequelize');



/********************************************************************************************** */




const adduser = async (req, res) => {

    const { error, value } = validateSignup(req.body)
    if (error) {
        console.log(error);
        res.send(error.details)
    }
    else {

        const passcode = req.body.password
        const compPass = req.body.confirm_password
        const passwordHash = await bcrypt.hash(passcode, 10)
        console.log(passwordHash);
        const compPasswordHash = await bcrypt.compare(compPass, passwordHash)
        console.log(compPasswordHash);
        const compPassswordHash = await bcrypt.hash(compPass, 10)
        console.log(compPasswordHash);
        let info = {
            fullname: req.body.fullname,
            email: req.body.email,
            mobile_number: req.body.mobile_number,
            userID: req.body.userID,
            password: passwordHash,
            confirm_password: passwordHash
        }
        let login = {
            userID: req.body.userID,
            password: passwordHash,
            timeStamp: req.body.timeStamp
        }
        const email = req.body.email
        const mobile_number = req.body.mobile_number
        // const password = req.body.password;
        // const confirm_password = req.body.confirm_password;

        const emailId = await addUser.findOne({
            where: { email: email }
        });
        const mobile = await addUser.findOne({
            where: { mobile_number: mobile_number }
        });
        if (emailId == 'NULL') {
            res.status(400).send({ message: `${email} is already registered.` })
        }
        else if (mobile == 'NULL') {
            res.status(400).send({ message: `${mobile} is already registered.` })
        }
        else {
            if (compPasswordHash) {
                const emp = await addUser.create(info)
                res.status(200).send({ message: "user added succesfully", data: emp })
                const log = await loginU.create(login)
            }
            else {
                res.status(400).send({ message: "password didnt match" })
            }
        }
    }
    console.log(value);



}


const details = async (req, res) => {
    let times = await addUser.findAll({})
    res.status(200).send(times)
}




module.exports = {
    adduser,
    details
}