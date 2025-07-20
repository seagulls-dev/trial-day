'use strict';

const respond = require('./responses');
const Issue = require('../models/issue');
const IssueRevision = require('../models/issueRevision');
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
  
  await IssueRevision.create({
    issue_id: issue.id,
    changes: { title, description },
    issue: { id: issue.id, title, description },
    created_by: context.user?.id || "unknown"
  });
  respond.success(context, { issue });
};

Issues.update = async (context) => {
  const { id } = context.params;
  const { title, description } = context.request.body;
  const issue = await Issue.findByPk(id);
  if (!issue) {
    respond.error(context, "Issue not found");
    return;
  }
  if (title) issue.title = title;
  if (description) issue.description = description;
  await issue.save();

  await IssueRevision.create({
    issueId: issue.id,
    changes: { title, description },
    issue: { id: issue.id, title: issue.title, description: issue.description },
    createdBy: context.user?.id || null
  });
  respond.success(context, { issue });
};

Issues.getRevisionByIssueId = async (context) => {
  const { id } = context.params;
  const revisions = await IssueRevision.findAll({ 
    where: { issueId: id },
    order: [['createdAt', 'ASC']]
  });
  respond.success(context, { revisions });
};

module.exports = Issues;
