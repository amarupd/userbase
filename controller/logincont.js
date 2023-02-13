const db = require("../models")
const loginUser = db.logins;
const addUser = db.registrations;
const addOtp = db.otps;
const bcrypt = require('bcryptjs')
const sequelize = require('../sequelizetempelate')


const { QueryTypes } = require('sequelize');

const details = async (req, res) => {
    let times = await loginUser.findAll({})
    res.status(200).send(times)
}

const credential = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await sequelize.query(`SELECT email,password FROM registrations WHERE email ='${email}'`,
        {
            type: QueryTypes.SELECT
        });


    let uID = user.map(item => item.email);
    const str = uID.toString();

    let pass = user.map(item => item.password);
    const passwordHash = pass.toString();

    console.log(str, passwordHash);

    const compPasswordHash = await bcrypt.compare(password,passwordHash)
    console.log(compPasswordHash);

    if (email == str && compPasswordHash == true) {

        let times = await addUser.findOne({where:{email:`${email}`}})
        res.status(200).send({ message: "succesfully login", data: times })
    } else if (email != str) {
        res.status(400).send({ message: "user not found" })
    } else if (email == str && compPasswordHash != true) {
        res.status(400).send({ message: "Invalid password" })
    }
    else {
        res.status(400).send({ message: "email and password didn't match" })
    }
}

const otp=async (req,res)=>{
    const mobile_number = req.body.mobile_number 
    const mobile = await sequelize.query(`SELECT mobile_number FROM registrations WHERE mobile_number ='${mobile_number}'`,
        {
            type: QueryTypes.SELECT
        });
        let pass = mobile.map(item => item.mobile_number);
        const pstr = pass.toString();
        if(pstr=='NULL')
        {
            res.status(400).send({message:`${pstr} is not registered with us`})
        }
        else{
            const otpdetails = await addOtp.findOne({
                where: { id: 2 }
            });
            console.log(otpdetails);
            res.send({data:otpdetails})
        }

}

module.exports = {
    details,
    credential,
    otp
}