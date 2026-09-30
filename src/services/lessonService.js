const store = require('./store');
const HttpError = require('../utils/HttpError');
const { WEEKDAYS } = require('../utils/constants');

let nextId = 1;

const pickFields = (d) => {
  const out = {};
  for (const k of ['title', 'weekday', 'startTime', 'endTime']) {
    if (d[k] !== undefined) out[k] = d[k];
  }
  return out;
};

// Персональное правило: занятия в один день не должны пересекаться по времени.
// Строки "HH:MM" сравниваются лексикографически — это корректно для формата с ведущими нулями.
function assertNoOverlap(lesson, ignoreId) {
  const conflict = store.find(
    (l) =>
      l.id !== ignoreId &&
      l.weekday === lesson.weekday &&
      lesson.startTime < l.endTime &&
      l.startTime < lesson.endTime
  );
  if (conflict) {
    throw new HttpError(
      400,
      `Занятие пересекается с "${conflict.title}" (${conflict.weekday} ${conflict.startTime}-${conflict.endTime})`
    );
  }
}

function getAll(filter = {}) {
  if (filter.weekday !== undefined) {
    if (!WEEKDAYS.includes(filter.weekday)) {
      throw new HttpError(400, `weekday в фильтре должен быть одним из: ${WEEKDAYS.join(', ')}`);
    }
    return store.filter((l) => l.weekday === filter.weekday);
  }
  return store;
}

function getById(id) {
  const lesson = store.find((l) => l.id === Number(id));
  if (!lesson) throw new HttpError(404, `Занятие с id=${id} не найдено`);
  return lesson;
}

function create(data) {
  const lesson = { id: nextId, ...pickFields(data) };
  assertNoOverlap(lesson);
  nextId++;
  store.push(lesson);
  return lesson;
}

function replace(id, data) {
  const lesson = getById(id);
  const updated = { id: lesson.id, ...pickFields(data) };
  assertNoOverlap(updated, lesson.id);
  return Object.assign(lesson, updated);
}

function update(id, patch) {
  const lesson = getById(id);
  const merged = { ...lesson, ...pickFields(patch) };
  if (merged.startTime >= merged.endTime) {
    throw new HttpError(400, 'startTime должен быть раньше endTime');
  }
  assertNoOverlap(merged, lesson.id);
  return Object.assign(lesson, merged);
}

function remove(id) {
  const lesson = getById(id);
  store.splice(store.indexOf(lesson), 1);
}

module.exports = { getAll, getById, create, replace, update, remove };
