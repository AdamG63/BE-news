const request = require('supertest');
const { response } = require('../app');
const app = require('../app');
const db = require('../db/connection')
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed')
beforeEach(() => seed(testData));
afterAll(() => db.end());

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
    test('404: responds with not found when passed with a invalid endpoint', () => {
    return request(app)
    .get('/api/tropics')
    .expect(404)
    .then(({body}) => {
        expect(body.msg).toBe('Not found')
    })
})
})
describe('GET /api/articles/:articles_id', () => {
    test('200: responds with single matching article', () => {
    const ARTICLE_ID = 1;
    return request(app)
    .get(`/api/articles/${ARTICLE_ID}`)
    .expect(200)
    .then(({body})=> {
        expect(body.article).toEqual({
            article_id: ARTICLE_ID,
            title: "Living in the shadow of a great man",
            author: "butter_bridge",
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: '2020-07-09T20:11:00.000Z',
            votes: 100,
        })
    })
})
    test('400: responds with bad request when passed a bad use ID', () => {
    return request(app)
    .get('/api/articles/notAnID')
    .expect(400)
    .then(({ body }) => {
    expect(body.message).toBe('Bad request')
    })
})
    test('404: responds with not found when passed a ID that does not exist', () => {
    const ARTICLE_ID = 50;
    return request(app)
    .get(`/api/articles/${ARTICLE_ID}`)
    .expect(404)
    .then(({body})=> {
        expect(body.msg).toBe('Not found')
})

})
})
