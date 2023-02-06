const express = require("express");
const router = require("./routes/loginroute");
const srouter = require("./routes/registrationroutes");
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
app.use("/registration", srouter);
// app.use("/time", drouter);
app.get("", (req, res) => {
    res.json({ message: "hello from api" });
});

app.listen(port, () => {
    console.log(`server is listening to the port number :- ${port}`);
});
