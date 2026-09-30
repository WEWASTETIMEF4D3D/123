// Централизованный обработчик ошибок (4 аргумента — так Express его узнаёт)
module.exports = (err, req, res, next) => {
  // Битый JSON в теле запроса
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Некорректный JSON в теле запроса' });
  }
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ error: status === 500 ? 'Внутренняя ошибка сервера' : err.message });
};
