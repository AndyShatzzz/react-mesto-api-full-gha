const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');

const {
  createUsers,
  login,
} = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUsers);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

module.exports = router;
