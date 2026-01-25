// //Using Passport + sessions
// // Passport handles auth
// // Sessions handle persistence


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

// const userSchema = new Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             trim: true,//It automatically removes spaces from the start and end of a string before saving.
//         },

//         phone: {
//             type: String,
//             required: true,
//             unique: true,
//         },

//         role: {
//             type: String,
//             enum: ["OWNER", "CUSTOMER"],//The role field can ONLY be one of these values
//             default: "CUSTOMER",
//         },
//     },
//     { timestamps: true }//Mongoose adds two fileds automatically - createdAt and updatedAt
// );

// // Use phone instead of username
// userSchema.plugin(passportLocalMongoose, {
//     usernameField: "phone",
//     usernameLowerCase: false,
// });

// module.exports = mongoose.model("User", userSchema);//Exports it so other files can use it
