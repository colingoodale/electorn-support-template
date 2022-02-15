const router = require('express').Router();
const authController = require('../../controllers/authController');

// Matches /auth/:id
router.route('/:id')
  .put(authController.update)
  .delete(authController.delete)

// Matches /auth/createUser
router.route('/createUser')
  .post(authController.createUser)

// Matches /auth/find
router.route('/find')
  .get(authController.find)

// Matches /auth/findByRole
router.route('/findByRole')
.get(authController.findByRole)

// Matches /auth/find/:id
router.route('/find/:id')
  .get(authController.findOne)

module.exports = router