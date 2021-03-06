require('dotenv').config();
const app = require('./config/server').app;

// Connction to the DB >
require('./config/db');

// Routes
const itemsRouter = require('./routes/items');
const userRouter = require('./routes/users');
const authRoutes = require('./auth/authRoutes');

app.use('/', authRoutes);
app.use('/items', itemsRouter);
app.use('/users', userRouter);
