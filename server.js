const express = require("express");
const router = require("./routes/emproutes");
const srouter = require("./routes/salroutes");
// const drouter = require("./routes/dailyroute");
const cors = require("cors");
const app = express();
const port = process.env.port || 5001;

var corOption = {
    origin: "http://localhost:8081",
};

app.use(cors(corOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/employee", router);
app.use("/salary", srouter);
// app.use("/time", drouter);
app.get("", (req, res) => {
    res.json({ message: "hello from api" });
});

app.listen(port, () => {
    console.log(`server is listening to the port number :- ${port}`);
});
