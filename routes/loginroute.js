const dailyController=require('../controller/logincont')

const drouter=require('express').Router()


drouter.get("/getlogin",dailyController.details)

drouter.post("/credential",dailyController.credential)

module.exports=drouter;