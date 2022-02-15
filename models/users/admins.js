const BaseUser = require('./baseUser');
const mongoose = require('mongoose');

const Admin = BaseUser.discriminator('Admin', new mongoose.Schema({}));

module.exports = Admin;