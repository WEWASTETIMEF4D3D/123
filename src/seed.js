const service = require('./services/lessonService');

const N = 8; // мой порядковый номер в списке группы

const data = [
  { title: 'Футбол',     weekday: 'mon', startTime: '10:00', endTime: '11:30' },
  { title: 'Плавание',   weekday: 'mon', startTime: '12:00', endTime: '13:00' },
  { title: 'Шахматы',    weekday: 'tue', startTime: '15:00', endTime: '16:00' },
  { title: 'Баскетбол',  weekday: 'wed', startTime: '18:00', endTime: '19:30' },
  { title: 'Йога',       weekday: 'thu', startTime: '09:00', endTime: '10:00' },
  { title: 'Теннис',     weekday: 'fri', startTime: '17:00', endTime: '18:30' },
  { title: 'Карате',     weekday: 'sat', startTime: '11:00', endTime: '12:30' },
  { title: 'Рисование',  weekday: 'sun', startTime: '14:00', endTime: '15:30' },
];

function seed() {
  data.slice(0, N).forEach((l) => service.create(l));
}

module.exports = seed;
