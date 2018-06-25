const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const dbConfig = require('./config/file');

// Middleware
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const crud = require('./routes/crudRoutes');

app.use('/api/crud', crud);

app.listen(3000, () => {
  console.log('Running on port 3000');
});
