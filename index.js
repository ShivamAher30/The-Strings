const express = require("express");
const PORT = 900;
const path = require("path")

const ejs = require("ejs")
const app = express();

app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.get("/",(req,res)=>{
    res.render("index")
})




app.listen(PORT, (err) => {

})