const router = require('express').Router();

const {
  getUsers,
  getUserId,
  patchUser,
  patchUserAvatar,
  getUserMeOwn,
} = require('../controllers/users');

const { validateUserGetId, validatePatchUser, validatePatchUserAvatar } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserMeOwn);
router.get('/:userId', validateUserGetId, getUserId);
router.patch('/me', validatePatchUser, patchUser);
router.patch('/me/avatar', validatePatchUserAvatar, patchUserAvatar);

module.exports = router;
