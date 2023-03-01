const { Schema, model } = require("mongoose");

const hobbySchema = new Schema({
	hobbyName: {
		type: String,
		required: true,
	},
	hobbyAbout: {
		type: String,
	},
	hobbyFan: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const Hobby = model("Hobby", hobbySchema);

module.exports = Hobby;
