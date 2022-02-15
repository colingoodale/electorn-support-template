const router = require("express").Router()
const notificationsController = require('../../controllers/notificationsController')

// matches /api/notification
router.route('/')
  .post(notificationsController.create)

// matches /api/notification/:id
router.route('/:id')
    .get(notificationsController.findByUserId)
    .delete(notificationsController.remove)

module.exports = router