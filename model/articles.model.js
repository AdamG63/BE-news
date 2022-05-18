const db = require('../db/connection');

exports.selectArticleById = (article_id) => {
    return db.query('SELECT articles.*, COUNT(comments.comment_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id', [article_id]).then(({rows}) => {
        if(!rows.length){
            return Promise.reject({
                status: 404,
                msg: 'Not found'
             })
        }
        return rows[0]
    })
}

exports.updateArticleById = (article_id, updateBody) => {
    const {inc_votes} = updateBody
    return db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *',[inc_votes, article_id]).then(({rows}) => {
        if(!rows.length){
           return Promise.reject({
                status: 404,
                msg: 'Not found'
            })
        }
        return rows[0]
    })
}