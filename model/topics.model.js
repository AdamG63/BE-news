const db = require('../db/connection');

exports.fetchTopics = () => {
    return db.query('SELECT * FROM topics').then((result) => {
       console.log(result.rows, 'in the model')
        return result.rows
    })
}