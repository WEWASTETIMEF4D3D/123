const service = require('../services/lessonService');

exports.getAll = (req, res, next) => {
  try {
    res.status(200).json(service.getAll(req.query));
  } catch (err) {
    next(err);
  }
};

exports.getOne = (req, res, next) => {
  try {
    res.status(200).json(service.getById(req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  try {
    res.status(201).json(service.create(req.body));
  } catch (err) {
    next(err);
  }
};

exports.replace = (req, res, next) => {
  try {
    res.status(200).json(service.replace(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res, next) => {
  try {
    res.status(200).json(service.update(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
};

exports.remove = (req, res, next) => {
  try {
    service.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
