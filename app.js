const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');


// routes
app.get('*', checkUser);
app.get('/', requireAuth, (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

db(MONGODB_URL);

app.listen(PORT, () => {
  console.log(`application is running on: http:/127.0.0.1:${PORT}`);
})