const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(`${process.env.DATABASE_URL || "mongodb://localhost:27017/frienderv2"}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
module.exports = mongoose.connection;
