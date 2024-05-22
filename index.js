require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const app = express();
// require("./db/conn");

const PORT = process.env.PORT || 4000;

//Database Connection

mongoose.connect(process.env.DB_URI, {useNewUrlParser : true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error",(error)=>{
    console.log(error);
})
db.once("open",()=>{
    console.log("connected to database");
})

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(
    session({
        secret: "My Secret Key",
        saveUninitialized: true,
        resave: false,
    })
);

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//set template engine
app.set("view engine","ejs");



// const static_path = path.join(__dirname,"../public");
// const template_path = path.join(__dirname,"../templates/views");
// const partials_path = path.join(__dirname,"../templates/partials");


// app.use(express.static(static_path));
// app.set("view engine","hbs");
// app.set("views",template_path);
// hbs.registerPartials(partials_path);

app.use("", require("./routes/routes"))

app.listen(PORT,()=>{
    console.log(`Server is Running Perfectly at Port No:${PORT}`);
});