const dailyController=require('../controller/otp')

const otprouter=require('express').Router()


otprouter.get("/getallotp",dailyController.details)

otprouter.post("/addotp",dailyController.addotp)



module.exports=otprouter;