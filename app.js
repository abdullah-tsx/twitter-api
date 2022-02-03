require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");


const {error} = require("./middleware/error");
const authRoutes = require("./routes/auth");
const tweetRoutes = require("./routes/tweet");
const userRoutes = require("./routes/user");
const notFoundRoute = require("./routes/notFound")

const app = express();

/*Middlewares*/
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/*Routes*/

app.use('/api/auth', authRoutes);
app.use('/api/tweet/', tweetRoutes);
app.use('/api/user/', userRoutes);
app.use(notFoundRoute);

/*Error Middleware*/
app.use(error);

/*Database Connection*/
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});
db.once('open', () => {
    console.log('DB connection established');
})

/*Start Server*/
app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
})
