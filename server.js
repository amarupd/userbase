const express = require("express");
const router = require("./routes/loginroute");
const srouter = require("./routes/registrationroutes");
const lrouter = require("./routes/otproutes");
const otprouter = require("./routes/fotgotpasswordroute");
const otploginrouter = require("./routes/otploginroutes");

// const drouter = require("./routes/dailyroute");
const cors = require("cors");
const app = express();
const port = process.env.port || 5001;

var corOption = {
    origin: "http://localhost:5002",
};

app.use(cors(corOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/login", router);
app.use("/registerUser", srouter);
app.use("/otp", lrouter);
app.use("/forgotPassword", otprouter);
app.use("/otpLogin", otploginrouter);
// app.use("/time", drouter);
app.get("", (req, res) => {
    res.json({ message: "hello from api" });
});

app.listen(port, () => {
    console.log(`server is listening to the port number :- ${port}`);
});
