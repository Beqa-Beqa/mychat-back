const mongoose = require("mongoose");

// Connection to db
const connectDB = () => mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to mongodb via mongoose"))
.catch((err) => console.log(`Something went wrong: ${err}`));

module.exports = connectDB;