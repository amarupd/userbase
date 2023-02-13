const db = require("../models")
const { validateSignup } = require('../validato')
const loginU = db.logins;
const regist = db.registrations;
const bcrypt = require('bcryptjs')
const axios=require('axios')
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelizetempelate')
var CryptoJS = require("crypto-js")
/************************************************************************************************************************************** */
var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
const forgot = async (req, res) => {
    const mobile = req.body.mobile_number
    const url = `https://bulksms.analyticsmantra.com/sendsms/sendsms.php?username=SUNSURRYA&password=tech321&type=TEXT&sender=MMSTER&mobile=${mobile}&message=Use%20${seq}%20as%20OTP%20to%20login%20into%20MyMaster11&PEID=1201161650796863916&HeaderId=1205161650964871534&templateId=1207161736910206136`;
    let response = await axios.get(url);
    console.log(response);
    // console.log(`value   hvgcnbdfb   of otp is ${seq}`);
    console.log(`Your otp for changing password is ${seq} do not share it with anyone`);
    var ciphertext = CryptoJS.AES.encrypt(`${mobile}.${seq}`, `${seq}`).toString();
    const user = await regist.findOne({ where: { mobile_number: mobile } })
    console.log(user)
    if (!user) {
        res.status(400).send({ message: 'mobile number is not registered please signup' })
    }
    else {
        // Encrypt

        console.log(ciphertext)
        res.status(200).send({ message:'otp sent succesfull',data:ciphertext})

    }

}

const otpverify = async (req, res) => {
    console.log(`value of otp is ${seq}`);
    const mobileno = req.body.mobile_number
    const OTP = req.body.enter_otp
    const passcode = req.body.hash
    const pass = req.body.password
    var bytes = CryptoJS.AES.decrypt(passcode, `${seq}`);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    var string = originalText.split(".");
    const m = string[0];
    const otp = string[1];
    console.log(m, otp);
    
    if (m == mobileno && OTP == otp) {
        const { value } = validateSignup(pass)
        const passwordHash = await bcrypt.hash(pass, 10)
        console.log(passwordHash);

        let employee = await regist.update({ password: passwordHash, confirm_password: passwordHash }, { where: { mobile_number: mobileno } })
        let employeee = await regist.findOne({ where: { mobile_number: mobileno } })
        const userid = await sequelize.query(`SELECT userID FROM registrations WHERE mobile_number =${mobileno}`,
            {
                type: QueryTypes.SELECT
            })
        let mappedArray = userid.map(item => item.userID);
        const str = mappedArray.toString();
        console.log(str)
        let loginpasscode = await loginU.update({ password: passwordHash }, { where: { userID: str } })
        res.status(200).send({ meassage: 'password is changed succesfully', data: employeee })
        console.log(employee)
        console.log(value);
    }
    else {
        res.status(400).send('invalid otp')
    }
}
module.exports = {
    forgot,
    otpverify
}