Summary

This API was built using TDD with Jest as the testing framework. The backend framework used for the routes is Express and for the database PSQL.

Routes

GET /api
Description - Serves up a json representation of all the available endpoints of the api

GET /api/topics
Description - Returns an array of all topics

GET /api/articles
Description - Returns an array of all articles

GET /api/users
Description - Returns an array of objects of all the users available

GET /api/articles/:article_id/comments
Description - Returns an array of comments for a particular article (queries available for this endpoint - author, topic, sort_by, order)

PATCH /api/articles/:article_id
Description - Returns the updated article. Fields required - inc_votes : Number (It will increase the votes when passed a positive number and decrease the votes when passed a positive number

POST /api/articles/:article_id/comments -
Description - Updates the database with a new comment for a given article

DELETE /api/comments/:comment_id
Description - Deletes a comment when passed from the database

Packages used

dotenv
jest-extended
jest-sorted
pg-format
supertest
husky

Set up instructions

1. Clone the repository using git clone https://github.com/AdamG63/BE-news.git

2. Run npm install to install the dependencies needed

3. Once dependencies have been installed run command npm run setup-dbs to create the databases

4. To seed the databases run

   npm run seed for the development data
   npm run seedTestData for the test data

5. before you run the tests you need to create 2 .env files in the root of your folder :

   .env.test
   .env.development

6. After you created the .env files you need to create these variables to be able to run the tests

   PGDATABASE=nc_news (for .env.development)
   PGDATABASE=nc_news_test (for .env.test)

7. You're all set, all that's left is to run the tests!
   npm test

Minimum Versions Needed

Node : 17.6.0
PSQL : 12.10
