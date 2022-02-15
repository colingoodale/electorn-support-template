const BaseUser = require('./baseUser');
const mongoose = require('mongoose');

const teamLead = BaseUser.discriminator('TeamLead', new mongoose.Schema({}))

module.exports = teamLead;