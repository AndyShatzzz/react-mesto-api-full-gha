const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorConflictingRequest,
} = require('../errors/errors');
const errorMessage = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => next(error));
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorBadRequest(errorMessage.userBadRequestMessage));
      } else {
        next(error);
      }
    });
};

module.exports.createUsers = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      res.send({
        email: user.email,
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.validationErrorMessage));
      } else if (error.code === 11000) {
        next(new ErrorConflictingRequest(errorMessage.conflictingRequestMessage));
      } else {
        next(error);
      }
    });
};

module.exports.patchUser = (req, res, next) => {
  const userId = req.user._id;

  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((updateUser) => {
      if (!updateUser) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(updateUser);
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.validationErrorMessage));
      } else {
        next(error);
      }
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const userId = req.user._id;

  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((updateUserAvatar) => {
      if (!updateUserAvatar) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(updateUserAvatar);
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.validationErrorMessage));
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({ token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }) });
    })
    .catch((error) => next(error));
};

module.exports.getUserMeOwn = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(user);
      }
    })
    .catch((error) => next(error));
};
