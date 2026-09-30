require('dotenv').config();
const app = require('./src/app');
const seed = require('./src/seed');

seed();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));
