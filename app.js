const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const collection1 = require("./models/loginconfig");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const nocache = require('nocache');
const morgan = require('morgan');
const multer = require('multer');
const mongoose = require('mongoose'); // Include the appropriate database module
const Product = require('./models/products'); // Import your product model

require('dotenv').config()

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const oneday = 1000 * 60 * 60 * 24; // one day in seconds

app.use(session({
    secret: 'your-Secret-Key',
    resave: false,
    cookie: { maxAge: oneday },
    saveUninitialized: true
}));

app.use(nocache());

app.use((req, res, next) => {
    // Check if req.user or req.session.user is defined
    if (!req.user && !req.session.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static("uploads"));

app.use('/', userRouter);
app.use('/admin', adminRouter);

// Error handling middleware

// app.use((req, res, next) => {
//   next(createError(404)); // Forward to the error handler
// });

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });


app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
