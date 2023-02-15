const dailyController=require('../controller/registrationcont')

const drouter=require('express').Router()


drouter.post("/addUser",dailyController.adduser)

drouter.get("/getAllUser",dailyController.details)


module.exports=drouter;