const express = require('express');
const connectDB = require('./config/db');

const app = express();
// connect database
connectDB();
//json middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/texts', require('./routes/texts'));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log('Running'));
