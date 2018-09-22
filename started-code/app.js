require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const flash = require("connect-flash");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

mongoose.Promise = Promise;
mongoose
  .connect(
    "mongodb://localhost/vaina2",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

//session

app.use(
  session({
    secret: "uber-for-loundry",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000000000000000000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware Setup
app.use(flash());
require('./passport')(app);
// Express View engine setu

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local

app.use((req, res, next) => {
  app.locals.title = "Express - Generated with IronGenerator";
  app.locals.user = req.user;
  next();
});

const index = require("./routes/index");
app.use("/", index);
const auth = require("./routes/auth");
app.use("/", auth);

module.exports = app;
