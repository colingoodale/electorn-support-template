const db = require('../models');

module.exports = {
  findByUserId: async function(req, res) {
    try {
      const notifications = await db.Notification.find({ userId: req.params.id});
      res.json(notifications);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  create: async function(req, res) {
    try {
      const n = await db.Notification.create(req.body);      
      res.json(n);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  remove: async function(req, res) {
    try {
      await db.Notification.findByIdAndDelete(req.params.id);
      res.status(200).send();
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}