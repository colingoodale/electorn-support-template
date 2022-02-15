const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: {
    type: String, 
    required: true,
  },
  data: Schema.Types.Mixed,
  read: {
    type: Boolean,
    default: false
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;