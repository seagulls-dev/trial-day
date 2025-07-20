module.exports = {
  port: process.env.PORT || 8081,
  mysql: {
    host: "localhost",
    user: "root",
    password: "abc123456",
    database: "issue_db",
    port: "3307",
  },
  SECRET: 'your-secret-key',
};
