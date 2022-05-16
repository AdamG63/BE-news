const request = require('supertest');
const { response } = require('../app');
const app = require('../app');
const db = require('../db/connection')
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed')
beforeEach(() => seed(testData));
afterAll(() => db.end);

describe('GET /api/topics', () => {
    test('200: responds with an array of topic objects', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array)
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
            expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String)
            })
        })
    })

})
test('404: responds with not found when passed with the wrong endpoint', () => {
    return request(app)
    .get('/api/tropics')
    .expect(404)
    .then(({body}) => {
        expect(body.msg).toBe('Not found')
    })
})
})
