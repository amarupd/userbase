const dailyController=require('../controller/otplogincont')

const otprouter=require('express').Router()


otprouter.post("/sendOtp",dailyController.otpLogin)

otprouter.post("/otpVerification",dailyController.otpverify)

module.exports=otprouter;











