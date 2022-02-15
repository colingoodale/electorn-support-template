const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseUserOptions = {
    discriminationKey: 'userType',
    collection: 'users'
};

const baseUserSchema = new Schema({
    _id:{
        type:String,
        required:"An _id must be provided when creating a user with Firebase Auth"
    },
    email: {
        type:String
    },
    photoURL: {
        type:String
    },
    firstName: {
        type:String
    },
    lastName: {
        type:String
    },
    role: {
        type:String,
        default:"developer"
    },
    team: {
        type:Schema.Types.ObjectId,
        ref:'Team'
    },
    active:{
        type:Boolean,
        default:true
    },
    deviceTokens: [String]
}, baseUserOptions)

const BaseUser = mongoose.model("BaseUser", baseUserSchema);

module.exports = BaseUser;