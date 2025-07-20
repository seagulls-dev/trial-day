'use strict';

const respond = require('./responses');
const Issue = require('../models/issue');

const baseUrl = 'http://localhost:8080';

const Issues = {};

Issues.get = async (context) => {
  const issue = await Issue.findByPk(context.params.id);
  respond.success(context, { issue });
};

Issues.getAll = async (context) => {
  const issues = await Issue.findAll();
  respond.success(context, { issues });
};

Issues.create = async (context) => {
  const { title, description } = context.request.body;
  if (!title || !description) {
    respond.error(context, "title and description are required");
    return;
  }
  const issue = await Issue.create({ title, description });
  respond.success(context, { issue });
};

module.exports = Issues;
