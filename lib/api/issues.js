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
//task 2
Issues.getAll = async (context) => {
  const issues = await Issue.findAll();
  respond.success(context, { issues });
};
//task 1
Issues.create = async (context) => {
  const { title, description } = context.request.body;
  const userEmail = context.state?.user?.email || 'unknown';

  if (!title || !description) {
    respond.error(context, "title and description are required");
    return;
  }
  const issue = await Issue.create({ title, description, created_by: userEmail, updated_by: userEmail });
  
  await IssueRevision.create({
    issue_id: issue.id,
    changes: { title, description },
    issue: { id: issue.id, title: issue.title, description: issue.description },
    created_by: userEmail
  });
  
  respond.success(context, { issue });
};
//task 3
Issues.update = async (context) => {
  const { id } = context.params;
  const { title, description } = context.request.body;
  const userEmail = context.state?.user?.email || 'unknown';

  const issue = await Issue.findByPk(id);
  if (!issue) {
    respond.error(context, "Issue not found");
    return;
  }

  const changes = {};
  if (title && title !== issue.title) {
    changes.title = title;
    issue.title = title;
  }
  if (description && description !== issue.description) {
    changes.description = description;
    issue.description = description;
  }

  if (Object.keys(changes).length === 0) {
    respond.success(context, { issue }); // No actual change
    return;
  }

  issue.updated_by = userEmail;
  await issue.save();

  await IssueRevision.create({
    issue_id: issue.id,
    changes,
    issue: {
      title: issue.title,
      description: issue.description
    },
    created_by: userEmail
  });

  respond.success(context, { issue });
};
//task 4
Issues.getRevisionByIssueId = async (context) => {
  const { id } = context.params;
  const revisions = await IssueRevision.findAll({ 
    where: { issueId: id },
    order: [['createdAt', 'ASC']]
  });
  respond.success(context, { revisions });
};
//task 6
Issues.getRevisionDiff = async (context) => {
  const { id } = context.params;
  const { from, to } = context.query;

  if (!from || !to) {
    respond.error(context, "Both revA and revB are required");
    return;
  }

  const revisions = await IssueRevision.findAll({
    where: { issue_id: id },
    order: [['created_at', 'ASC']],
  });

  const fromRevision = revisions.find(r => r.id === parseInt(from));
  const toRevision = revisions.find(r => r.id === parseInt(to));

  if (!fromRevision || !toRevision) {
    respond.error(context, "One or both revisions not found");
    return;
  }

  // Extract the issue snapshots
  const before = fromRevision.issue;
  const after = toRevision.issue;

  // Determine changed fields
  const changes = {};
  for (const key in after) {
    if (before[key] !== after[key]) {
      changes[key] = {
        before: before[key],
        after: after[key],
      };
    }
  }

  // Get revision trail (between from and to, inclusive)
  const fromIndex = revisions.findIndex(r => r.id === parseInt(from));
  const toIndex = revisions.findIndex(r => r.id === parseInt(to));

  const start = Math.min(fromIndex, toIndex);
  const end = Math.max(fromIndex, toIndex);

  const trail = revisions.slice(start, end + 1);

  respond.success(context, {
    before,
    after,
    changes,
    revisions: trail,
  });
};
module.exports = Issues;
