const express = require("express");
const app = express();
const { initDb } = require("./database/index");
require("dotenv").config();
const bodyParser = require("body-parser");
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const session = require("express-session");

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes"));

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToke, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}
      `
      : "Not Logged in yet",
  );
});

app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs", session: false
}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/")
  }
);
  
(async () => {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`🚀Server listenning localhost:${port}`);
    });
  } catch (error) {
    console.error("Server not started because DB connection failed:", error);
    process.exit(1);
  }
})();
