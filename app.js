const express = require('express')
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

// 导入的时候，会运行一遍代码， 因此有Google Strategy
const passportSetup = require('./config/passport-setup');
const { Strategy } = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express();

// connect to online mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongodb')
})


// set a view engine
app.set('view engine', 'ejs')


// setting cookie session
// after serialize the user, will create a cookie and lasts for one day
// received by broswer
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // one day
    keys: [keys.session.cookieKey] // key of cookie
}))


// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// use routers
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', {user: req.user})
})


app.listen(3000, () => {
    console.log('I am listening...')
})