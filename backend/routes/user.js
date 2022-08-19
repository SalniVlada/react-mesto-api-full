const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, findUserById, changeUserInfo, findUserAvatar, getUserMe,
} = require('../controllers/user');

router.get('/', getUser);
router.get('/me', getUserMe);

// найти пользователя по id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), findUserById);

// изменить информацию о себе
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), changeUserInfo);

// изменить аватар
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/),
  }),
}), findUserAvatar);

module.exports = router;
