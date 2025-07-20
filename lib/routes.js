'use strict';

const Router = require('koa-router');
const router = new Router();

router.get('/', require('./api/discovery'));
router.get('/health', require('./api/health'));
router.get('/issues/:id', require('./api/issues').get);
router.get('/issues/:id/revisions', require('./api/issues').getRevisionByIssueId);
router.get('/issues', require('./api/issues').getAll);
router.post('/issues', require('./api/issues').create);
router.put('/issues/:id', require('./api/issues').update);

module.exports = router;
