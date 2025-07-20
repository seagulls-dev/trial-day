const jwt = require('jsonwebtoken');

const SECRET = 'your-secret-key';

module.exports = async (ctx, next) => {
  const publicPaths = ['/', '/health'];

  if (publicPaths.includes(ctx.path)) {
    return next();
  }

  const clientId = ctx.headers['x-client-id'];
  const authHeader = ctx.headers['authorization'];

  if (!clientId) {
    ctx.status = 400;
    ctx.body = { error: 'X-Client-ID header is required' };
    return;
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { error: 'Authorization header missing or malformed' };
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    ctx.state.user = {
      email: decoded.email,
      id: decoded.sub,
      clientId
    };
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: err };
  }
};
