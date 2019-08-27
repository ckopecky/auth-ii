const db = require('../data/dbConfig');


const find = () => {
    return db('users');
}

const findById = (id) => {
    return db('users').where({id}).first()
}

const findBy = filter => {
    return db('users').where(filter);
}

const insert = async (user) => {
    const [id] = await db('users').insert(user);
    return findById(id);
}









module.exports = {
    find, findById, findBy, insert
}