const dailyController=require('../controller/otplogincont')

const drouter=require('express').Router()


drouter.post("/otpLogin",dailyController.details)

drouter.post("/otpverify",dailyController.credential)

module.exports=drouter;