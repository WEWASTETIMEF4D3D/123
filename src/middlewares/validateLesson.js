const { WEEKDAYS, TIME_RE } = require('../utils/constants');

function check(body, partial) {
  const errors = [];
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return ['Тело запроса должно быть JSON-объектом'];
  }

  const has = (k) => body[k] !== undefined;
  const need = (k) => !partial || has(k);

  if (partial && !['title', 'weekday', 'startTime', 'endTime'].some(has)) {
    errors.push('Передайте хотя бы одно поле: title, weekday, startTime, endTime');
  }
  if (need('title') && (typeof body.title !== 'string' || !body.title.trim())) {
    errors.push('title обязателен и должен быть непустой строкой');
  }
  if (need('weekday') && !WEEKDAYS.includes(body.weekday)) {
    errors.push(`weekday должен быть одним из: ${WEEKDAYS.join(', ')}`);
  }
  if (need('startTime') && !TIME_RE.test(body.startTime)) {
    errors.push('startTime обязателен и должен быть в формате HH:MM');
  }
  if (need('endTime') && !TIME_RE.test(body.endTime)) {
    errors.push('endTime обязателен и должен быть в формате HH:MM');
  }
  if (TIME_RE.test(body.startTime) && TIME_RE.test(body.endTime) && body.startTime >= body.endTime) {
    errors.push('startTime должен быть раньше endTime');
  }
  return errors;
}

const make = (partial) => (req, res, next) => {
  const errors = check(req.body, partial);
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};

// POST и PUT — все поля обязательны; PATCH — можно частично
exports.validateFull = make(false);
exports.validatePartial = make(true);
