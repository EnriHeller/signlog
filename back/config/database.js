const mongoose = require("mongoose");
require("dotenv").config()
const {HOST, DB_PORT, DB_NAME} = process.env;
const connectionString = `mongodb://${HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db =>console.log("Database is connected"))
.catch(err => console.log(err))

module.exports = mongoose;