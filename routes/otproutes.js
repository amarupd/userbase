const dailyController=require('../controller/otp')

const drouter=require('express').Router()


drouter.get("/getlogin",dailyController.details)

drouter.post("/getallotp",dailyController.addotp)

module.exports=drouter;