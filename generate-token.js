//task 5
const jwt = require('jsonwebtoken');
const config = require('./config');

const SECRET = config.SECRET;

const payload = {
    sub: 'user-id-123',
    email: 'hello@example.com',
};

const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

console.log('Generated JWT Token:', token);