const db = require("../models")
const { validateSignup } = require('../validato')
const loginU = db.logins;
const regist = db.registrations;
const bcrypt = require('bcryptjs')
const sequelize = require('../sequelizetempelate')
var CryptoJS = require("crypto-js")
/************************************************************************************************************************************** */
var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
const forgot = async (req, res) => {
    const mobile = req.body.mobile_number
    console.log(`value   hvgcnbdfb   of otp is ${seq}`);
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
        res.status(200).send({message:`Your otp for changing password is ${seq} do not share it with anyone`,data:ciphertext})

    }
    
}

const otpverify = async (req, res) => {
    const mobile = req.body.mobile_number
    console.log(`value of otp is ${seq}`);
    var ciphertext = CryptoJS.AES.encrypt(`${mobile}.${seq}`, `${seq}`).toString();
    var bytes = CryptoJS.AES.decrypt(ciphertext, `${seq}`);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    var string = originalText.split(".");
    const m = string[0];
    const otp = string[1];
    console.log(m, otp);
    const mobileno = req.body.mobile_number
    const OTP = req.body.enter_otp
    const passcode = req.body.password
    if (m == mobileno && otp == OTP) {
        const { error, value } = validateSignup(passcode)
        if (error) {
            console.log(error);
            res.send(error.details)
        }
        else {

            
            
            const passwordHash = await bcrypt.hash(passcode, 10)
            console.log(passwordHash);
            const updateEmp = async (req, res) => {
                let employee = await regist.update({password:passwordHash}, { where: { mobile_number: mobileno } })
                let employ = await regist.update({confirm_password:passwordHash}, { where: { mobile_number: mobileno } })
                let loginpasscode = await loginU.update({password:passwordHash}, { where: { mobile_number: mobileno } })
                res.status(200).send({meassage:'password is changed succesfully',data:employ})
            }
        }
        console.log(value);
    }
}



module.exports = {
    forgot,
    otpverify
}