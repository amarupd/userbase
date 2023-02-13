const dailyController=require('../controller/otplogincont')

const otprouter=require('express').Router()


otprouter.post("/otpLogin",dailyController.otpLogin)

otprouter.post("/otpverify",dailyController.otpverify)

module.exports=otprouter;











