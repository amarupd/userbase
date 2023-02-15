const db = require("../models")
const addUser = db.registrations;
const sequelize = require('../sequelizetempelate')
var CryptoJS = require("crypto-js")
const axios=require('axios')

const { QueryTypes } = require('sequelize');

// const details = async (req, res) => {
//     let times = await loginUser.findAll({})
//     res.status(200).send(times)
// }

var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

const otpLogin = async (req, res) => {
    const mobile_number = req.body.mobile_number
    const user = await sequelize.query(`SELECT mobile_number FROM registrations WHERE mobile_number ='${mobile_number}'`,
        {
            type: QueryTypes.SELECT
        });
    let uID = user.map(item => item.mobile_number);
    const str = uID.toString();

    console.log(str); 

    // const compPasswordHash = await bcrypt.compare(password,passwordHash)
    // console.log(compPasswordHash);

    if (mobile_number == str) {
        const url = `https://bulksms.analyticsmantra.com/sendsms/sendsms.php?username=SUNSURRYA&password=tech321&type=TEXT&sender=MMSTER&mobile=${mobile_number}&message=Use%20${seq}%20as%20OTP%20to%20login%20into%20MyMaster11&PEID=1201161650796863916&HeaderId=1205161650964871534&templateId=1207161736910206136`;
        let response = await axios.get(url);
        console.log(response);
        var ciphertext = CryptoJS.AES.encrypt(`${mobile_number}.${seq}`, `${seq}`).toString();
        console.log(ciphertext)
        res.status(200).send({ message:'otp sent succesfull',data:ciphertext})
    }
}

const otpverify = async (req, res) => {
    console.log(`value of otp is ${seq}`);
    const mobileno = req.body.mobile_number
    const OTP = req.body.otp
    const passcode = req.body.hash
    var bytes = CryptoJS.AES.decrypt(passcode, `${seq}`);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    var string = originalText.split(".");
    const m = string[0];
    const otp = string[1];
    console.log(m, otp);
    
    if (m == mobileno && OTP == otp) {
        // const { value } = validateSignup(pass)
        // const passwordHash = await bcrypt.hash(pass, 10)
        // console.log(passwordHash);

        let employeee = await addUser.findOne({ where: { mobile_number: mobileno } })
        res.status(200).send({ meassage: 'logged in succesfully', data: employeee })
        console.log(employeee)
    }
    else {
        res.status(400).send('invalid otp')
    }
}

module.exports = {
    otpLogin,
    otpverify
}