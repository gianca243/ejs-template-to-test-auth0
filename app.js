const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
require('dotenv').config() 

const { auth } = require('express-openid-connect');
const {
    AuthRouter,
  } = require("./routes");

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
    clientSecret: process.env.CLIENTSECRET,
    authorizationParams: {
        response_type: 'code',
        audience: process.env.AUDIENCE,
        scope: 'openid profile email'
    }
};

app.set("views", "./views");
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.json({ limit: "50MB" }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(auth(config));

app.use("/", AuthRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
