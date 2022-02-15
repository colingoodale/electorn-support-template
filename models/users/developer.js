const BaseUser = require('./baseUser');
const mongoose = require('mongoose');

const Developer = BaseUser.discriminator('Developer', new mongoose.Schema({}));

module.exports = Developer;