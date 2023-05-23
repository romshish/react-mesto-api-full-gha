import Card from '../models/cards.js';
import Badrequest from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found-err.js';
import Forbidden from '../errors/forbidden-err.js';

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then(cards => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      card.populate(['owner'])
        .then(() => res.send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badrequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .orFail(() => next(new NotFoundError('Карточка с указанным _id не найдена')))
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) throw new Forbidden('Вы не можете удалять чужые карточки');
      return card.deleteOne()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badrequest('Передан некорректный _id'));
      } else if (err.name === 'CastError') {
        next(new Badrequest(' Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) throw new Error('not found');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badrequest('Переданы некорректные данные для постановки лайка'));
      } else if (err.name === 'CastError') {
        next(new Badrequest(' Передан несуществующий _id карточки'));
      } else if (err.message === 'not found') {
        next(new NotFoundError(' Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) throw new Error('not found');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badrequest('Переданы некорректные данные для снятия лайка'));
      } else if (err.name === 'CastError') {
        next(new Badrequest(' Передан несуществующий _id карточки'));
      } else if (err.message === 'not found') {
        next(new NotFoundError(' Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};

export {
  getCards, createCard, deleteCard, addLike, deleteLike,
};
