const db = require('../data/dbConfig');

module.exports = {
    
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('users')
        .select('id', 'username', 'department')
}

function findBy(filter) {
    return db('users')
        .where(filter)
}

function findById(id) {
    return db('users')
        .where( { id })
        .first()
}

function add(newUser) {
    return db('users')
    .insert(newUser)
    .returning('id')
    .then(id => {
        return findById(id[0])
    })
}