const jwt = require('jsonwebtoken');

const SECRET = 'your-secret-key';

const payload = {
    sub: 'user-id-123',
    email: 'hello@example.com',
};

const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

console.log('Generated JWT Token:', token);