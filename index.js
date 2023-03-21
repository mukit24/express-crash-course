const express = require('express');
const path = require('path');
const app = express();
const members = require('./Members');
const logger = require('./Middleware/logger');

// innitialize middleware
// app.use(logger);

app.get('/api/members', (req, res) => res.json(members));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));