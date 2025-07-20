'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./connection');

module.exports = sequelize.define('issue_revisions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  issue_id: { type: Sequelize.INTEGER, allowNull: false },
  changes: { type: Sequelize.JSON, allowNull: false },
  issue: { type: Sequelize.JSON, allowNull: false },
  created_by: { type: Sequelize.STRING, allowNull: true, defaultValue: 'unknown' },
  created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'issue_revisions',
});
