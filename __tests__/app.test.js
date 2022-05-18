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
            comment_count: expect.any(Number)
        })
    })
})
    test('200: responds with single matching article including a comment count', () => {
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
            comment_count: 11
        })
    })
})
    test('400: responds with bad request when passed a bad article ID', () => {
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
describe('PATCH /api/articles/:articles_id', () => {
    test('200: responds with updated article', () => {
        const ARTICLE_ID = 1
        const articleUpdates = {
            inc_votes: 100,
        };
        return request(app)
        .patch(`/api/articles/${ARTICLE_ID}`)
        .send(articleUpdates)
        .expect(200)
        .then(({ body }) => {
            expect(body.article).toEqual({
                article_id: ARTICLE_ID,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: '2020-07-09T20:11:00.000Z',
                votes: 200,
              })
        })
    })
    test('400: responds with a bad request when passed a bad article ID', () => {
        const ARTICLE_ID = 'notAnId'
        const articleUpdates = {
            inc_votes: 100,
        };
        return request(app)
        .patch(`/api/articles/${ARTICLE_ID}`)
        .send(articleUpdates)
        .expect(400)
        .then(({ body }) => {
        expect(body.message).toBe('Bad request')
        })
    })
    test('404: responds with not found when passed a ID that does not exist', () => {
        const ARTICLE_ID = 99
        const articleUpdates = {
            inc_votes: 100,
        };
        return request(app)
        .patch(`/api/articles/${ARTICLE_ID}`)
        .send(articleUpdates)
        .expect(404)
        .then(({body})=> {
        expect(body.msg).toBe('Not found')
        })
    })
    test('400: responds with a bad request when passed inc-votes in wrong format', () => {
        const ARTICLE_ID = 1
        const articleUpdates = {
            inc_votes: 'notNumber',
        };
        return request(app)
        .patch(`/api/articles/${ARTICLE_ID}`)
        .send(articleUpdates)
        .expect(400)
        .then(({ body }) => {
        expect(body.message).toBe('Bad request')
        })
    })
    test('400: responds with bad request when passed a missing article updates', () => {
        const ARTICLE_ID = 1
        const articleUpdates = {};
        return request(app)
        .patch(`/api/articles/${ARTICLE_ID}`)
        .send(articleUpdates)
        .expect(400)
        .then(({body})=> {
        expect(body.message).toBe('Bad request')
        })
    })
})
describe('GET /api/users', () => {
    test('200: responds with an array of objects with the username, name and avatar_url properties', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body }) => {
            expect(body.users).toBeInstanceOf(Array)
            expect(body.users).toHaveLength(4)
            body.users.forEach((user) => {
                expect.objectContaining({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
            })
            
            })
        })
    })
    test('404: responds with not found when passed with a invalid endpoint', () => {
        return request(app)
        .get('/api/user')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Not found')
        })
})
})
describe('GET /api/articles', () => {
    test('200: responds with articles sorted by created_at in descending order',() => {
        return request(app)
        .get('/api/articles?sort_by=created_at&&order_by=desc')
        .expect(200)
        .then(({body}) => {
            expect(body.articles).toBeSortedBy('created_at', {descending: true})
        })

    })
    test('400: responds with Bad request to invalid order queries', () => {
        return request(app)
        .get('/api/articles?sort_by=created_at&&order_by=descending')
        .expect(400)
        .then(({body}) => {
            console.log(body)
            expect(body.message).toBe('Bad request')
        })
    })
    test('400: responds with Bad request to invalid sort by queries', () => {
        return request(app)
        .get('/api/articles?sort_by=54')
        .expect(400)
        .then(({body}) => {
            console.log(body)
            expect(body.message).toBe('Bad request')
        })
    })
})
