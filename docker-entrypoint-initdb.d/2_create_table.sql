CREATE TABLE issue_db.issue_revisions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  issue_id INT NOT NULL,
  changes JSON NOT NULL,
  issue JSON NOT NULL,
  created_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (issue_id) REFERENCES issues(id)
);