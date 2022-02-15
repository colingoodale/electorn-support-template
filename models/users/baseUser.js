const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseUserOptions = {
    discriminationKey: 'userType',
    collection: 'users'
};

const baseUserSchema = new Schema({
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
    }
    deviceTokens: [
        {type: String}
    ]
}, baseUserOptions)

const BaseUser = mongoose.model("BaseUser", baseUserSchema);

module.exports = BaseUser;