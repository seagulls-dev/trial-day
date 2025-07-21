
# Testlio coding assignment Result (backend)

## Overview

This project is run on my Ubuntu machine to run Docker properly. I created a new repo in my git account and created own branch to push my results.
Whenever I finish each task, I commited to make things clear.

## Technical Issues 

1. I faced .env file is only working for Docker development enviroment, not the node server. So I manually touched the config.js file. I know this is not a good convention but this is not a big problem.
If this is the real project, I will surely find a solution to have a local .env file in the root project but not wanted to waste my time.

2. I noticed your project has not a correct way to manipulate the error, especially for the db management. I sugggest use try-catch blocks for creating, updating db transactions.

3. API Documentation

-Authentication

	All endpoints except / and /health require:

	A valid JWT in the Authorization header (e.g., Bearer <token>)

	A valid X-Client-ID header

-Base URL
	http://localhost:8081

-Endpoints
	* GET /
		Description: API discovery endpoint
		Auth Required: ❌
		Response:
			{ "message": "Welcome to the Issue Tracker API" }

	* GET /health
	Description: Health check
	Auth Required: ❌
	Response:
		{ "status": "OK" }

	* GET /issues
		Description: Get all issues
		Auth Required:  ✅
		Response:
			[
			  {
			    "id": 1,
			    "title": "Example",
			    "description": "An example issue",
			    "created_by": "user@example.com",
			    "created_at": "...",
			    ...
			  }
			]

	* GET /issues/:id
		Description: Get issue by ID
		Auth Required: ✅
		Path Parameters: 
			id: issue ID (integer)

	* POST /issues
		Description: Create a new issue
		Auth Required: ✅
		Request Body: 
			{
			  "title": "Bug in API",
			  "description": "This needs to be fixed"
			}
		Response:
			{
			  "issue": {
			    "id": 2,
			    "title": "Bug in API",
			    "description": "This needs to be fixed",
			    "created_by": "user@example.com",
			    ...
			  }
			}

	* PUT /issues/:id
		Description: Update an issue (partial update supported)
		Auth Required: ✅
		Path Parameters:
			id: issue ID
		Request Body:
			{
			  "title": "Updated Title",
			  "description": "Updated description"
			}

	* GET /issues/:id/revisions
		Description: Get all revisions of a specific issue
		Auth Required: ✅
		Response:
			[
			  {
			    "id": 1,
			    "issue_id": 1,
			    "changes": {
			      "title": "Initial title"
			    },
			    "issue": {
			      "id": 1,
			      "title": "Initial title",
			      "description": "..."
			    },
			    ...
			  },
			  ...
			]

	* GET /issues/:id/revisions/compare
		Description: Compare two revisions of an issue
		Auth Required: ✅
		Query Parameters:
			from: ID of revision A
			to: ID of revision B
		Response:
			{
			  "before": {
			    "id": 1,
			    "title": "Old Title",
			    "description": "Old description"
			  },
			  "after": {
			    "id": 1,
			    "title": "New Title",
			    "description": "Updated description"
			  },
			  "changes": {
			    "title": {
			      "before": "Old Title",
			      "after": "New Title"
			    },
			    "description": {
			      "before": "Old description",
			      "after": "Updated description"
			    }
			  },
			  "revisions": [
			    { "id": 2, ... },
			    { "id": 3, ... },
			    { "id": 4, ... }
			  ]
			}

-Required Headers(for authenticated routes)
	| Header        | Example                   | Required |
	| ------------- | ------------------------- | -------- |
	| Authorization | `Bearer <your-jwt-token>` | ✅      |
	| X-Client-ID   | `test-client`             | ✅      |



