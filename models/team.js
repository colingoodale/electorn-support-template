const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name:String,
    developers: [{type:Schema.Types.ObjectId, ref:'users'}],
    active:Boolean
});